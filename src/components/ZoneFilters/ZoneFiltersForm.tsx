import React, { FunctionComponent, useState } from 'react';
import { Form, Row, Col, DatePicker, Select, Button, Card, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useVehicleCategories } from '../../hooks/vehicleCategories';
import { useVehicleModels } from '../../hooks/vehicleModels';
import { useVehicleTypes } from '../../hooks/vehicleTypes';
import { useProvinces } from '../../hooks/province';
import { isDateAfterNow } from '../../shared/dates';
import { useVehicleSegments } from '../../hooks/vehicleSegments';
import { useDateRanges } from '../../hooks/dateRanges';
import { useAccounts } from '../../hooks/accounts';
import { useZones } from '../../hooks/zones';
import { useDistricts } from '../../hooks/districts';
import { ZoneFilters } from '../../shared/filters';

interface ZoneFiltersProps {
  onFinish: (values: any) => void;
  initialValues: ZoneFilters;
}

const ZoneFiltersForm: FunctionComponent<ZoneFiltersProps> = ({
  onFinish,
  initialValues,
}: ZoneFiltersProps) => {
  const [form] = Form.useForm();

  const {
    isLoading: isLoadingVehicleCategories,
    vehicleCategories,
  } = useVehicleCategories();

  const { isLoading: isLoadingZones, zones } = useZones();
  const { isLoading: isLoadingDistricts, districts } = useDistricts({
    provinceIds: form.getFieldValue('provinces'),
    accountId: form.getFieldValue('account'),
  });

  const {
    isLoading: isLoadingVehicleSegments,
    vehicleSegments,
  } = useVehicleSegments({
    vehicleCategoryId: form.getFieldValue('vehicleCategory'),
  });
  const { isLoading: isLoadingVehicleTypes, vehicleTypes } = useVehicleTypes({
    vehicleCategoryId: form.getFieldValue('vehicleCategory'),
    vehicleSegmentId: form.getFieldValue('vehicleSegment'),
  });
  const { isLoading: isLoadingVehicleModels, vehicleModels } = useVehicleModels(
    {
      vehicleCategoryId: form.getFieldValue('vehicleCategory'),
      vehicleSegmentId: form.getFieldValue('vehicleSegment'),
      vehicleType: form.getFieldValue('vehicleType'),
      requireFilters: false,
    }
  );

  const { isLoading: isLoadingProvinces, provinces } = useProvinces({
    accountId: form.getFieldValue('account'),
    zoneIds: form.getFieldValue('zones'),
  });
  const { isLoading: isLoadingDateRanges, dateRanges } = useDateRanges({});
  const { isLoading: isLoadingAccounts, accounts } = useAccounts();

  const [count, setCount] = useState(0);
  const reRender = () => {
    setCount(count + 1);
  };
  const gutter = 20;

  const isAccountSelected = !!form.getFieldValue('account');

  if (!initialValues.selectedDate) {
    return (
      <div style={{ marginBottom: 10 }}>
        <Spin />
      </div>
    );
  }

  return (
    <Card
      title={
        <>
          <SearchOutlined />
          <span>FILTROS DE BÚSQUEDA</span>
        </>
      }
      className="card-minimal"
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialValues}
        onValuesChange={reRender} // Re-rendering the whole component after form changes makes select chaining much easier and clearer
      >
        <Form.Item shouldUpdate noStyle>
          <Row className="row-divided" gutter={gutter} align="top">
            <Col md={6}>
              <Form.Item label="Año-Mes" name="selectedDate">
                <DatePicker
                  placeholder="Seleccione una fecha"
                  picker="month"
                  style={{ width: '100%' }}
                  disabledDate={isDateAfterNow}
                  allowClear={false}
                />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Rango" name="dateRange">
                <Select loading={!!isLoadingDateRanges}>
                  {dateRanges.map((dateRange) => (
                    <Select.Option value={dateRange.id} key={dateRange.id}>
                      {dateRange.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={12} style={{ textAlign: 'right', alignSelf: 'flex-end' }}>
              <Button type="primary" htmlType="submit">
                Aplicar filtros
              </Button>
            </Col>
          </Row>
          <Row className="row-divided" gutter={gutter}>
            <Col md={6}>
              <Form.Item label="Cuenta" name="account">
                <Select
                  placeholder="Todas"
                  allowClear
                  loading={!!isLoadingAccounts}
                  onChange={(_) => {
                    form.setFieldsValue({
                      zones: undefined,
                      provinces: undefined,
                      districts: undefined,
                    });
                  }}
                >
                  {accounts.map((account) => (
                    <Select.Option value={account.id} key={account.id}>
                      {account.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Zona" name="zones">
                <Select
                  placeholder="Todas"
                  allowClear
                  loading={!!isLoadingZones}
                  disabled={isAccountSelected}
                  mode="multiple"
                >
                  {zones.map((zone) => (
                    <Select.Option value={zone.id} key={zone.id}>
                      {zone.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Provincia" name="provinces">
                <Select
                  placeholder="Todas"
                  mode="multiple"
                  loading={!!isLoadingProvinces}
                  optionFilterProp="children"
                  showSearch
                >
                  {provinces.map((province) => (
                    <Select.Option value={province.id} key={province.id}>
                      {province.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Departamento" name="districts">
                <Select
                  placeholder="Todos"
                  allowClear
                  loading={!!isLoadingDistricts}
                  disabled={!districts.length}
                  showSearch
                  optionFilterProp="children"
                  mode="multiple"
                >
                  {districts.map((district) => (
                    <Select.Option
                      value={district.id}
                      key={`${district.id}${district.name}`}
                    >
                      {district.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row className="row-divided" gutter={gutter}>
            <Col md={6}>
              <Form.Item label="Categoría" name="vehicleCategory">
                <Select
                  placeholder="Todas"
                  allowClear
                  loading={!!isLoadingVehicleCategories}
                  showSearch
                  optionFilterProp="children"
                  onChange={(_) => {
                    form.setFieldsValue({
                      vehicleSegment: undefined,
                      vehicleType: undefined,
                      vehicleModel: undefined,
                    });
                  }}
                >
                  {vehicleCategories.map((vehicleCategory) => (
                    <Select.Option
                      value={vehicleCategory.id}
                      key={vehicleCategory.id}
                    >
                      {vehicleCategory.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Segmento" name="vehicleSegment">
                <Select
                  placeholder="Todos"
                  allowClear
                  loading={!!isLoadingVehicleSegments}
                  disabled={!vehicleSegments.length}
                  showSearch
                  optionFilterProp="children"
                  onChange={(_) => {
                    form.setFieldsValue({
                      vehicleType: undefined,
                      vehicleModel: undefined,
                    });
                  }}
                >
                  {vehicleSegments.map((vehicleSegment) => (
                    <Select.Option
                      value={vehicleSegment.id}
                      key={vehicleSegment.id}
                    >
                      {vehicleSegment.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col md={6}>
              <Form.Item label="Tipo" name="vehicleType">
                <Select
                  placeholder="Todos"
                  allowClear
                  loading={!!isLoadingVehicleTypes}
                  disabled
                  showSearch
                  optionFilterProp="children"
                  onChange={(_) => {
                    form.setFieldsValue({
                      vehicleModel: undefined,
                    });
                  }}
                >
                  {vehicleTypes.map((vehicleType) => (
                    <Select.Option value={vehicleType.id} key={vehicleType.id}>
                      {vehicleType.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Modelo" name="vehicleModel">
                <Select
                  placeholder="Todos"
                  allowClear
                  loading={!!isLoadingVehicleModels}
                  showSearch
                  optionFilterProp="children"
                >
                  {vehicleModels.map((vehicleModel) => (
                    <Select.Option
                      value={vehicleModel.id}
                      key={vehicleModel.id}
                    >
                      {vehicleModel.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default ZoneFiltersForm;
