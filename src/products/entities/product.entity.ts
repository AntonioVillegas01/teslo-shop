import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "../../auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name:'products'})
export class Product {

  @ApiProperty({
    example:'c597d9a2-99a3-4efd-811c-b63c824ecce3',
    description:'Product ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @ApiProperty({
    example:'T-Shirt Teslo',
    description:'Product Title ',
    uniqueItems: true
  })
  @Column('text',{
    unique: true
  })
  title:string

  @ApiProperty({
    example:39.99,
    description:'Product Price',
    default: 0
  })
  @Column('float',{
    default:0
  })
  price: number;

  @ApiProperty({
    example: "LOREM IPSUM ",
    description:'Product Description',
    default: null
  })
  @Column({
    type:'text',
    nullable:true
  })
  description: string;

  @ApiProperty({
    example: "t-shirt-teslo",
    description:'Product Slug - for SEO',
    uniqueItems: true
  })
  @Column('text',{
    unique:true
  })
  slug: string;

  @ApiProperty(
    {
      example: 10,
      description:'Product stock',
      default:0
    }
  )
  @Column('int', {
    default:0
  })
  stock:number;

  @ApiProperty(
    {
      example: ['M','XL'],
      description:'Product sizes',
    }
  )
  @Column('text',{
    array:true
  })
  sizes: string[]

  @ApiProperty(
    {
      example: 'women',
      description:'Product Gender',
    }
  )
  @Column('text')
  gender: string;

  @ApiProperty(
    {
      example: ['tag1','tag2'],
      description:'Product sizes',
    }
  )
  @Column('text', {
    array:true,
    default: []
  })
  tags: string[];

  @ApiProperty()
  @OneToMany(
    ()=> ProductImage,
    (productImage) => productImage.product,
    {
      cascade: true,
      eager:true    // para relaciones con otras tablas
    }
  )
  images?: ProductImage[]


  @ManyToOne(
    ()=>User,
    (user)=> user.product,
    {eager:true}
  )
  user: User;




  @BeforeInsert()
  checkSlugInsert(){
    if(!this.slug){
      this.slug = this.title
    }
    this.slug = this.slug.toLowerCase()
      .replaceAll(' ','-')
      .replaceAll("'",'')
  }


  @BeforeUpdate()
  checkSlugUpdate(){
    this.slug = this.slug.toLowerCase()
      .replaceAll(' ','-')
      .replaceAll("'",'')
  }


}
