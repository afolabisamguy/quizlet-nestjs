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
exports.CreateFlashcardsInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const flashcard_item_input_1 = require("./flashcard-item.input");
let CreateFlashcardsInput = class CreateFlashcardsInput {
    flashCardSetId;
    flashcards;
};
exports.CreateFlashcardsInput = CreateFlashcardsInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFlashcardsInput.prototype, "flashCardSetId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [flashcard_item_input_1.FlashcardItemInput]),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => flashcard_item_input_1.FlashcardItemInput),
    __metadata("design:type", Array)
], CreateFlashcardsInput.prototype, "flashcards", void 0);
exports.CreateFlashcardsInput = CreateFlashcardsInput = __decorate([
    (0, graphql_1.InputType)()
], CreateFlashcardsInput);
//# sourceMappingURL=create-flashcards.input.js.map