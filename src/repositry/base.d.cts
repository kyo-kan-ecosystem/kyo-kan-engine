/**
 * @template IDType
 */
export class Repositry<IDType> {
    constructor(datas?: {});
    _datas: any;
    /**
     *
     * @param {IDType} id
     * @param {*} data
     */
    set(id: IDType, data: any): void; /**
     *
     * @param {IDType} id
     * @param {*} data
     */
    get(id: any): any;
    getSerializeDatas(): any;
}
