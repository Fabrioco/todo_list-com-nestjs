import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { Task } from "./task/entities/task.entity";
import { TaskModule } from "./task/task.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: false, // IMPORTANTE: false em produção
        autoLoadEntities: true,
        ssl:
          process.env.NODE_ENV === "production"
            ? {
                rejectUnauthorized: false,
              }
            : false,
        migrations: [__dirname + "/migrations/*{.ts,.js}"],
        cli: {
          migrationsDir: "src/migrations",
        },
      }),
    }),
    UsersModule,
    TaskModule,
  ],
})
export class AppModule {}
