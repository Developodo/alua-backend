import { ApiProperty } from "@nestjs/swagger";

export class UpdateAthleteDto {
    @ApiProperty()
    id:number
    @ApiProperty()
    firstname?:string
    @ApiProperty()
    profile?:string
    @ApiProperty()
    profile_medium?:string
    @ApiProperty()
    performance?:string
}