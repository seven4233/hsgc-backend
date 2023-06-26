import { IsNotEmpty } from "class-validator";

export class CreateMomentDto {
    // 标题
    @IsNotEmpty()
    title: string

    // 内容
    @IsNotEmpty()
    content: string

}
