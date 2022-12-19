import { makeAutoObservable } from "mobx";

export default class DeviceStore{

    public _types: any[];
    public _brands: any[];
    public _devices: any[];
    public _selectedType: any;
    public _selectedBrand: any;
    public _page: any;
    public _totalCount: any;
    public _limit: any;

    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setTypes(types: any) {
        this._types = types
    }
    setBrands(brands: any) {
        this._brands = brands
    }
    setDevices(devices: any) {
        this._devices = devices
    }

    setSelectedType(type: any) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand: any) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page: any) {
        this._page = page
    }
    setTotalCount(count: any) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}