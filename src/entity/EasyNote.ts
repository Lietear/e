import {Entity, PrimaryColumn, Column, Index, CreateDateColumn} from "typeorm";

@Entity({name:'easy_note'})
export default class EasyNote {

    @PrimaryColumn()
    @Index()
    note: string;

    @Column({nullable:true})
    customer: string;

    @Column({nullable:true})
    history_note: string;

    @Column({nullable:true})
    category_note: string;

}
