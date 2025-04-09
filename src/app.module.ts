import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { Task } from "./task/entities/task.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "12345678",
      database: "nextauth",
      autoLoadEntities: true,
      entities: [User, Task],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
