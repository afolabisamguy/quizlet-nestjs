"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FlashcardsService = class FlashcardsService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createFlashcard(flashcardsInput) {
        const flashExists = await this.prismaService.flashcardSets.findUnique({
            where: {
                id: flashcardsInput.flashCardSetId,
            },
        });
        if (!flashExists) {
            throw new common_1.NotFoundException('User not found');
        }
        const flashcards = await this.prismaService.flashcards.create({
            data: {
                answer: flashcardsInput.answer,
                question: flashcardsInput.question,
                flashcardSetId: flashcardsInput.flashCardSetId,
            },
            include: { flashcardSet: true },
        });
        return flashcards;
    }
    async viewFlashcard(flashcardSetsId, flashCardId) {
        const flashExists = await this.prismaService.flashcardSets.findUnique({
            where: {
                id: flashcardSetsId,
            },
        });
        if (!flashExists) {
            throw new common_1.NotFoundException('User not found');
        }
        const flashcard = await this.prismaService.flashcards.findUnique({
            where: {
                id: flashCardId,
            },
        });
        if (!flashcard) {
            throw new common_1.NotFoundException('the flashcard for this id does not exist');
        }
        return {
            flashcard,
        };
    }
    async viewAllFlashcards(flashCardSetId) {
        const flashCardSetExists = await this.prismaService.flashcardSets.findUnique({
            where: {
                id: flashCardSetId,
            },
        });
        if (!flashCardSetExists) {
            throw new common_1.NotFoundException('User not found');
        }
        const flashcards = await this.prismaService.flashcards.findMany({
            where: {
                flashcardSetId: flashCardSetId,
            },
            include: {
                flashcardSet: true,
            },
        });
        console.log('We reached here');
        return flashcards;
    }
    async updateFlashcards(flashcardsInput, flashcardSetId) {
        const flashExists = await this.prismaService.flashcardSets.findUnique({
            where: {
                id: flashcardSetId,
            },
        });
        if (!flashExists) {
            throw new common_1.NotFoundException('User not found');
        }
        const flashcards = await this.prismaService.flashcards.updateMany({
            where: {
                flashcardSetId: flashcardSetId,
            },
            data: {
                question: flashcardsInput.question,
                answer: flashcardsInput.answer,
            },
        });
        return flashcards;
    }
    async deleteFlashcards(flashcardInput, flashcardId) {
        const flashExists = await this.prismaService.flashcardSets.findUnique({
            where: {
                id: flashcardInput.flashCardSetId,
            },
        });
        if (!flashExists) {
            throw new common_1.NotFoundException('Flashcard set not found');
        }
        const flashcards = await this.prismaService.flashcards.delete({
            where: {
                id: flashcardId,
            },
        });
        return flashcards;
    }
};
exports.FlashcardsService = FlashcardsService;
exports.FlashcardsService = FlashcardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FlashcardsService);
//# sourceMappingURL=flashcards.service.js.map