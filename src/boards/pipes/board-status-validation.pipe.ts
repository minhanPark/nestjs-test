/*
 자바스크립트에서는 class를 상속할 때 extends를 사용하지 않나?
 class Rabbit extends Animal {
  hide() {
    alert(`${this.name} 이/가 숨었습니다!`);
  }
}
그렇다면 밑에 implements를 쓰는 건 자바스크립트의 class가 아닌건가?
 */

import { PipeTransform, BadRequestException } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
