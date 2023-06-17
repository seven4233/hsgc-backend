import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  // 账号
  @Column('varchar', { unique: true, nullable: true })
  account?: string;
  // 密码
  @Column('varchar')
  password: string;
  // 昵称
  @Column('varchar', { nullable: true })
  username: string;
  // 头像
  @Column('varchar', {
    nullable: true,
    default:
      'https://cdn.huashui666.com/static/defaultAvatar/defaultAvatar.jpg',
  })
  avatar: string;
  // 邮箱
  @Column('varchar', { nullable: true })
  email: string;
  // 电话
  @Column('varchar', { nullable: true })
  phone: string;
  // 性别
  @Column('tinyint', { nullable: true })
  gender: string;

  // 个性签名
  @Column('varchar', { nullable: true })
  signature: string;

  // 宿舍
  @Column('varchar',  { nullable: true })
  dorm: string;
    // 年级
  @Column('varchar',  { nullable: true })
  grade: string;

  // 标签

  // @Column('simple-array', {nullable: true})
  // tags: string[];
  @OneToMany(() => Tag, (tag) => tag.userId)
  tags: Tag[];

  // 地址
  @Column('varchar', { nullable: true })
  address: string;
  // 专业
  @Column('varchar', { nullable: true })
  major: string;

  // 学院
  @Column('varchar', { nullable: true })
  college: string;

  // 学院代号
  @Column('varchar', { nullable: true })
  collegeCode: string;
  // 权限
  @Column('tinyint', { default: 0 })
  access: number;
  // 消息数量
  @Column('int', { default: 0 })
  notifyCount: number;
  // 未读数量
  @Column('int', { default: 0 })
  unreadCount: number;
  // 创建时间
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  // 更新时间
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn()
  isDelete?: Date;
}
