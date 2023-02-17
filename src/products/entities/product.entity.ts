import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from './';
import { User } from "src/auth/entities/user.entity";

import { ApiProperty } from "@nestjs/swagger";


@Entity({name: 'products'})
export class Product {

    @ApiProperty({ 
        example: '1a2b3c4d5e6f7g8h9i0j',
        description: 'The unique identifier of the product',
        uniqueItems: true
     })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ 
        example: 'T-Shit Teslo',
        description: 'The unique title of the product',
        uniqueItems: true
     })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({ 
        example: 0,
        description: 'The price of the product',
        uniqueItems: false
     })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({ 
        example: 'This product is lorem ipsum dolor sit amet',
        description: 'The description of the product',
        uniqueItems: false,
        default: null
     })
    @Column({
        type: 'text',
        nullable: true
    })
    description:string;

    @ApiProperty({ 
        example: 't-shirt-teslo',
        description: 'The slug of the product, for SEO and URL',
        uniqueItems: true
     })
    @ApiProperty()
    @Column('text', {
        unique: true,
    })
    slug: string;

    @ApiProperty({ 
        example: 0,
        description: 'Quantity of the product in stock',
        uniqueItems: false,
        default: 0
     })
    @Column('int', {
        default: 0
    })
    stock: number

    @ApiProperty({ 
        example: ['S','M','L','XL'],
        description: 'Sizes of the product',
     })
    @Column('text', {
        array: true,
    })
    sizes: string[];

    @ApiProperty({ 
        example: ['Male', 'Female', 'Kids'],
        description: 'Product gender',
     })
    @ApiProperty()
    @Column('text')
    gender: string;
    
    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {
            cascade: true,
            eager: true,
        }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
    )
    user: User; 

    @BeforeInsert()
    checkSlug() {
        if(!this.slug) {
            this.slug = this.title
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
          
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '')
    }
}
