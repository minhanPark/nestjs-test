# 정리

## 커스텀 파이프

커스텀 파이프를 만들기 위해서는 Pipe Transform을 갖고와서 상속해야함.  
또 이것과 함께 transform 메소드를 필요로 합니다.

```js
transform(처리가 된 인자의 값, 인자에 대한 메타 데이터)
```

```js
import { PipeTransform, BadRequestException } from "@nestjs/common";
import { BoardStatus } from "../board.model";

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
```

지금은 value만 사용해서 value만 받지만 metadata를 받으면 두번째 인자로 사용해주면됨.

## typeorm 설치

> @nestjs/typeorm  
> nestjs에서 typeorm을 사용하기 위해 연동시켜주는 모듈

> typeorm  
> typeorm 모듈

> pg  
> postgres 모듈

## dto 작성 시 class를 사용하는 이유

DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체다.  
인터페이스를 이용하거나 클래스를 이용할 수 있는데 클래스를 추천한다.  
클래스는 Javascript ES6의 표준이기 때문에 컴파일 된 후에도 엔터티로 보존되는 반면에 인터페이스는 변환중에 제거되기 때문에  
Nest는 런타임에 참조할 수가 없습니다.(이것은 파이프와 같은 기능에서 런타임에 변수의 메타타입에 접근할 가능성이 있을 수도 있기 때문입니다. )

## 모듈을 불러 올 때 forRoot와 forRootAsync 차이

기본적으로 독립적이거나 값이 다 하드코딩 되어 있다면 forRoot를 사용하는 것 같다.  
그러나 다른 모듈 등에서 값을 받아와야 한다면 forRootAsync를 사용해야 값을 가져오는 것 같다.  
즉 해당 모듈을 동기적으로 실행시켜도 될지, 아니면 다른 모듈과 연관이 있어서 비동기적으로 실행해야하는 지에 대한 차이인듯

## Repository ?

데이터베이스에 관련 된 일은 서비스에서 하는게 아닌 Repository에서 하면된다.  
이것을 Repository Pattern 이라고 부릅니다.(데이터 베이스 관련 일 - INSERT, FIND, DELETE 등)
