
## 프로그래머스 없어진 동물 찾기(왜 틀릴까?)
SELECT ANIMAL_ID, NAME FROM ANIMAL_OUTS WHERE NAME NOT IN (SELECT NAME FROM ANIMAL_INS WHERE NAME IS NOT NULL) ORDER BY ANIMAL_ID

- 정답
SELECT OUTS.ANIMAL_ID, OUTS.NAME FROM ANIMAL_OUTS OUTS LEFT OUTER JOIN ANIMAL_INS INS ON OUTS.ANIMAL_ID = INS.ANIMAL_ID WHERE INS.ANIMAL_ID IS NULL ORDER BY OUTS.ANIMAL_ID

## 루시와 엘라(특정 이름 들어간 컬럼 찾기)
SELECT ANIMAL_ID, NAME , SEX_UPON_INTAKE FROM ANIMAL_INS WHERE NAME IN ('Lucy', 'Ella', 'Pickle', 'Rogan', 'Sabrina', 'Mitty')

SELECT DATETIME FROM ANIMAL_INS ORDER BY DATETIME ASC LIMIT 1

## 동명 동물 수 찾기
SELECT NAME, COUNT(*) as COUNT FROM ANIMAL_INS GROUP BY NAME HAVING COUNT(NAME) >= 2 ORDER BY NAME

## 이름이 있는 동물 
SELECT ANIMAL_ID FROM ANIMAL_INS WHERE NAME IS NOT NULL ORDER BY ANIMAL_ID ASC

## 보호 시작일이 더 빠른 동물 찾기
SELECT INS.ANIMAL_ID, INS.NAME FROM ANIMAL_INS AS INS INNER JOIN ANIMAL_OUTS AS OUTS WHERE INS.ANIMAL_ID = OUTS.ANIMAL_ID AND INS.DATETIME > OUTS.DATETIME

## 시간별 갯수 구하기
SELECT HOUR(datetime),count(*) FROM animal_outs WHERE hour(datetime) > 8 and hour(datetime) < 20 GROUP BY hour(datetime) ORDER BY hour(datetime)

## NULL 따로 처리하기
SELECT ANIMAL_TYPE ,IFNULL(name,'No name'), SEX_UPON_INTAKE FROM ANIMAL_INS

SELECT ANIMAL_ID, NAME , IF(sex_upon_intake LIKE '%Neutered%' OR SEX_UPON_INTAKE LIKE '%Spayed%','O','X') AS '중성화' FROM ANIMAL_INS ORDER BY ANIMAL_ID

## 입양을 못간 동물
SELECT INS.NAME, INS.DATETIME FROM ANIMAL_INS AS INS LEFT JOIN ANIMAL_OUTS AS OUTS ON INS.ANIMAL_ID = OUTS.ANIMAL_ID WHERE OUTS.ANIMAL_ID IS NULL ORDER BY INS.DATETIME LIMIT 3

## 헤비유저
SELECT ID, NAME, HOST_ID FROM PLACES WHERE HOST_ID IN (SELECT HOST_ID FROM PLACES GROUP BY HOST_ID HAVING COUNT(HOST_ID) >= 2) 
IN절을 사용하지 않으면 단일행만 나옴

## 중복제거하고 카운팅
SELECT COUNT(DISTINCT NAME) FROM ANIMAL_INS WHERE NAME IS NOT NULL

## 최상위 1개
SELECT NAME FROM ANIMAL_INS ORDER BY DATETIME ASC LIMIT 1

## 정렬
SELECT ANIMAL_ID, NAME, DATETIME FROM ANIMAL_INS ORDER BY NAME ASC, DATETIME DESC

## 데이트
SELECT ANIMAL_ID,NAME,DATE_FORMAT(DATETIME,'%Y-%m-%d') FROM ANIMAL_INS ORDER BY ANIMAL_ID

## 두 테이블의 기간차가 가장 긴 두명
SELECT INS.ANIMAL_ID, INS.NAME FROM ANIMAL_INS AS INS, ANIMAL_OUTS AS OUTS WHERE INS.ANIMAL_ID = OUTS.ANIMAL_ID ORDER BY OUTS.DATETIME-INS.DATETIME DESC LIMIT 2

## 
SELECT INS.ANIMAL_ID, INS.ANIMAL_TYPE, INS.NAME FROM ANIMAL_INS AS INS INNER JOIN ANIMAL_OUTS AS OUTS ON INS.ANIMAL_ID = OUTS.ANIMAL_ID WHERE INS.SEX_UPON_INTAKE LIKE '%Intact%' AND (OUTS.SEX_UPON_OUTCOME LIKE '%Neutered%' OR OUTS.SEX_UPON_OUTCOME LIKE '%Spayed%')

##
SET @hour := -1; 

SELECT (@hour := @hour + 1) as HOUR,
(SELECT COUNT(*) FROM ANIMAL_OUTS WHERE HOUR(DATETIME) = @hour) as COUNT
FROM ANIMAL_OUTS
WHERE @hour < 23