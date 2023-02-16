import { Product } from 'src/products/entities';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    uid: string;
    
    @Column('text', {
        unique: true,
    })
    email: string;
    
    @Column('text', {
        select: false
    })
    password: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    role: string[];
    
    @OneToMany(
        () => Product,
        (product) => product.user
    )
    product: Product;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
