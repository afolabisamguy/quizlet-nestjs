// Import Injectable, OnModuleDestroy, OnModuleInit from @nestjs/common.
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// Import PrismaClient from @prisma/client.
import { PrismaClient } from '@prisma/client';

// Apply the Injectable decorator to the next declaration.
@Injectable()
// Define the PrismaService class for this module feature.
export class PrismaService
  // Execute the statement: extends PrismaClient.
  extends PrismaClient
  // Execute the statement: implements OnModuleInit, OnModuleDestroy.
  implements OnModuleInit, OnModuleDestroy
// Open the class block.
{
  // Declare the constructor used to receive injected dependencies.
  constructor() {
    // Execute the statement: super.
    super({
      // Set the log field in the current object or type.
      log: ['query', 'info', 'warn', 'error'],
    // Close the current object or callback block.
    });
  // Close the block block.
  }

  // Define the onModuleInit asynchronous method.
  async onModuleInit() {
    // Wait for the asynchronous operation to complete.
    await this.$connect();
  // Close the method block.
  }

  // Define the onModuleDestroy asynchronous method.
  async onModuleDestroy() {
    // Wait for the asynchronous operation to complete.
    await this.$disconnect();
  // Close the method block.
  }
// Close the method block.
}
