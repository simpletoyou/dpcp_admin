export default class c2cAdminSvc {
  constructor(Api) {
    'ngInject';
    this.Api = Api;
  }
  /**
   * c2c配置查询
   */
  userMemberConfigInfo(params = {}) {
    return this.Api.get('/goldenTransaction/get-userMemberConfigInfo', params);
  }

  /**
   * c2c配置查询
   */
  updataUserMemberConfigInfo(params = {}, header) {
    return this.Api.get('/goldenTransaction/operate-userMemberConfig', params, header);
  }

  /**
   * c2c添加
   */
  insertAssetCode(params = {}, header) {
    return this.Api.post('/assetCodeConfig/insertAssetCode', params, header);
  }

  /**
   * c2c删除
   */
  deleteAssetCodeConfig(params = {}, header) {
    return this.Api.get('/assetCodeConfig/deleteAssetCodeConfig', params, header);
  }

  /**
   * c2c启用
   */
  updateAssetCodeConfig(params = {}, header) {
    return this.Api.post('/assetCodeConfig/updateAssetCodeConfig', params, header);
  }

  /**
   * c2c查询
   */
  getAssetCodeConfig(params = {}, header) {
    return this.Api.get('/assetCodeConfig/getAssetCodeConfig', params, header);
  }

  /**
   * 国家添加
   */
  addCountryConfig(params = {}, header) {
    return this.Api.post('/countryConfig/addCountryConfig', params, header);
  }

  /**
   * 国家删除
   */
  deleteC2cCountryConfig(params = {}, header) {
    return this.Api.get('/countryConfig/deleteC2cCountryConfig', params, header);
  }

  /**
   * 国家开启
   */
  updateC2cCountryConfig(params = {}, header) {
    return this.Api.post('/countryConfig/updateC2cCountryConfig', params, header);
  }

  /**
   * 国家配置
   */
  getC2cCountryConfigList(params = {}, header) {
    return this.Api.get('/countryConfig/getC2cCountryConfigList', params, header);
  }

  /**
   * 货币添加
   */
  addCurrencyConfig(params = {}, header) {
    return this.Api.post('/currencyConfig/addCurrencyConfig', params, header);
  }

  /**
   * 货币删除
   */
  deleteCurrencyConfi(params = {}, header) {
    return this.Api.get('/currencyConfig/deleteCurrencyConfig', params, header);
  }

  /**
   * 货币开启
   */
  updateCurrencyConfig(params = {}, header) {
    return this.Api.post('/currencyConfig/updateCurrencyConfig', params, header);
  }

  /**
   * 货币查询
   */
  getCurrencyConfig(params = {}, header) {
    return this.Api.get('/currencyConfig/getCurrencyConfig', params, header);
  }

  /**
   * 保证金添加
   */
  addMarginAddress(params = {}, header) {
    return this.Api.get('/config-json/addMarginAddress', params, header);
  }

  /**
   * 保证金修改
   */
  updateMarginAddress(params = {}, header) {
    return this.Api.get('/config-json/updateMarginAddress', params, header);
  }

  /**
   * 保证金删除
   */
  delMarginAddress(params = {}, header) {
    return this.Api.get('/config-json/delMarginAddress', params, header);
  }

  /**
   * 保证金查询
   */
  getMarginAddress(params = {}, header) {
    return this.Api.get('/config-json/getMarginAddress', params, header);
  }

}