export class Repositry {
    constructor(datas?: {});
    _datas: any;
    /**
     *
     * @param {any} id
     * @param {*} data
     */
    set(id: any, data: any): void; /**
     *
     * @param {any} id
     * @param {*} data
     */
    get(id: any): any;
    getSerializeDatas(): any;
}
