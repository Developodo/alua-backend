import { ApiProperty } from "@nestjs/swagger";

export class CreateChallengeDto {
    @ApiProperty()
    name:string;
    @ApiProperty({ required: false })
    description:string;
    @ApiProperty({ required: false })
    image:string;
    @ApiProperty()
    total_elevation_gain:number;
    @ApiProperty()
    club:any;
    @ApiProperty()
    type:string;
    @ApiProperty()
    start_date_local:Date;
    @ApiProperty()
    end_date_local:Date;
    @ApiProperty()
    stages:any;
    @ApiProperty({ required: false })
    athletes:any;
}
