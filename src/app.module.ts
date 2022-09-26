import { Module } from "@nestjs/common";
import { BoardsModule } from "./boards/boards.module";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { typeOrmConfig } from "./configs/typeorm.config";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        console.log("dirname", __dirname);
        return {
          type: "postgres",
          host: configService.get("DATABASE_HOST"),
          port: parseInt(configService.get("DATABASE_PORT")),
          username: configService.get("DATABASE_USER"),
          password: configService.get("DATABASE_PASSWORD"),
          database: configService.get("DATABASE_DATABASE"),
          entities: [__dirname + "../src/**/*.entity.{js,ts}"],
          synchronize: true
        };
      },
      inject: [ConfigService]
    }),
    BoardsModule
  ]
})
export class AppModule {}
