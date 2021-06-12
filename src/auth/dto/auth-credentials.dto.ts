import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
 @IsString()
 @MinLength(4)
 @MaxLength(20)
    username: string;

    @IsString()
 @MinLength(8)
 @MaxLength(20)
 @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
   { message :'password should contains numbers ,letters,and these special caracter :@!?_-*#...'}
    )
 password: string;
}