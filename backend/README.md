# GuessGuest BackEnd-End Api

<br>

## Get ("/houses?filter={관광명소}") - 게스트하우스 정보 리스트
### Response Body
```json
[
  {
    "houseId": 0,
    "name": "string",
    "reserveUrl": "string",
    "totalUser": 0,
    "male": 0,
    "female": 0,
    "korean": 0,
    "japanese": 0,
    "chinese": 0,
    "mbtiE": 0,
    "mbtiI": 0,
    "age20": 0,
    "age30": 0,
    "age40": 0,
    "solo": 0,
    "notSolo": 0,
    "place": "해운대",
    "address": "string",
    "description": "string"
  }
]
```

<br>

## Post ("/houses/ai") - ai 추천 게하 리스트
### Resuest Body
```json
{
  "userId": 0
}
```

### Response Body
```json
[
  {
    "houseId": 0,
    "name": "string",
    "reserveUrl": "string",
    "totalUser": 0,
    "male": 0,
    "female": 0,
    "korean": 0,
    "japanese": 0,
    "chinese": 0,
    "mbtiE": 0,
    "mbtiI": 0,
    "age20": 0,
    "age30": 0,
    "age40": 0,
    "solo": 0,
    "notSolo": 0,
    "place": "해운대",
    "address": "string",
    "description": "string"
  }
]
```

<br>

## Get ("/houses/stat?houseId={int}&date={date}") - 날짜별 게하 통계
```json
{
  "totalUser": 0,
  "male": 0,
  "female": 0,
  "korean": 0,
  "japanese": 0,
  "chinese": 0,
  "mbtiE": 0,
  "mbtiI": 0,
  "age20": 0,
  "age30": 0,
  "age40": 0,
  "solo": 0,
  "notSolo": 0
}
```

<br>

## Get ("/houses/user?houseId={int}&date={date}") - 날짜별 게하 유저리스트

## Response Body
```json
[
  {
    "userId": 0,
    "nickName": "string",
    "phoneNumber": "string",
    "gender": true,
    "age": 0,
    "isSolo": true,
    "hate": 0,
    "food": "Korean",
    "mbti": "E",
    "visitPlace": "string",
    "description": "string"
  }
]
```

<br>

## Post ("/users") - 유저 정보 반환

### Request Body
```json
{
  "userId": 0
}
```

### Response Body
```json
{
  "userId": 0,
  "nickName": "string",
  "phoneNumber": "string",
  "gender": true,
  "age": 0,
  "isSolo": true,
  "hate": 0,
  "food": "Korean",
  "mbti": "E",
  "visitPlace": "string",
  "description": "string"
}
```

<br>

## Put ("/users") - 유저 정보 수정

### Request Body
```json
{
  "userId": 0,
  "nickName": "string",
  "birthDate": "2025-03-06T00:31:30.905Z",
  "gender": true,
  "isSolo": true,
  "mbti": "E",
  "food": "Korean"
}
```

### Response Body
```json
{
  "userId": 0,
  "nickName": "string",
  "phoneNumber": "string",
  "gender": true,
  "age": 0,
  "isSolo": true,
  "hate": 0,
  "food": "Korean",
  "mbti": "E",
  "visitPlace": "string",
  "description": "string"
}
```

<br>

## Post ("/users/hate") - 싫어요
### Resuest Body
```json
{
  "userId": 0,
  "targetId": 0
}
```

### Response Body
```json
Succcess!
```