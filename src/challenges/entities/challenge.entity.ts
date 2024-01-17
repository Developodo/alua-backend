import { ApiProperty } from "@nestjs/swagger";

export class ChallengeEntity {
    @ApiProperty()
    id:number;
    @ApiProperty()
    name:string;
    @ApiProperty({ required: false })
    description:string|null;
    @ApiProperty({ required: false })
    image:string|null;
    @ApiProperty()
    total_elevation_gain:number;
    @ApiProperty()
    club:string;
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
