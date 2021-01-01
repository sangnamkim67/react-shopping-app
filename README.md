# React Shopping App
React를 사용하여 만든 여행지 쇼핑몰 입니다.
<br/>


### 1. 개요
<hr/>
React를 사용하여 만든 쇼핑몰 웹페이지로 , Windows환경의 chrome app에서 진행되었음 

<br/>

### 2. 핵심 기능
<hr/>

- 상품 업로드 페이지
- 상세보기 페이지
- Main Page 내에 필터
- 원하는 상품 검색
- Cart Page
- 상품 결제
<br/>

### 3. 실행 화면
<hr/>

- 로그인 페이지 & 회원가입 페이지
![](https://images.velog.io/images/nami0515/post/26754837-8b14-4db2-a9fd-08d23f786c54/login%20page.jpg)![](https://images.velog.io/images/nami0515/post/ee820b94-00db-4741-a37d-893645af43c2/register%20page.jpg)회원 관련된 정보는 MongoDB에 저장하여 사용되고 있으며, 로그인 후 관리자일 경우 상품 등록 페이지를 사용할 수 있다. 

- 메인 페이지
![](https://images.velog.io/images/nami0515/post/7a2dcf36-9bea-4c86-be22-f61084e54bdb/main%20page.jpg)
- 상품 검색
![](https://images.velog.io/images/nami0515/post/b0464504-fba0-4cc3-94bf-a43a3c6fb013/search.JPG)등록된 상품 중 필터를 통해 지역은 checkbox, 가격은 radiobox를 통해 구현
검색 박스를 통해 제목 또는 내용을 검색하여 화면에 출력
<br/>

- 상품 등록 페이지
![](https://images.velog.io/images/nami0515/post/35be67b8-b3fb-41e8-bf4b-1da3572c43f6/product.jpg) Dropzone을 이용해 사진을 등록할 수 있고 상품의 상세 정보를 등록 가능

- 상세 정보
![](https://images.velog.io/images/nami0515/post/61284d8c-cdce-4758-bb20-57584ae16051/detail%20page.jpg)상세 정보를 통해 등록된 상품의 가격과 상품에 대한 상세 설명을 볼 수 있고, 장바구니에 추가 가능

- 카트 페이지
![](https://images.velog.io/images/nami0515/post/ae86be7d-da6f-42cc-a7c9-acea62097708/cart%20page.jpg)장바구니에서 제거할 수 있고, 총 가격과 상품에 대한 설명을 출력, 결제까지 가능하다.
![](https://images.velog.io/images/nami0515/post/679110d8-87dd-49ed-8472-38a235e4343b/%EA%B2%B0%EC%A0%9C.jpg)
### 4. 개발 환경
<hr/>

- Javascript 
	- React
- CSS
	- Ant Design
- HTML
- Node.js
	- MongoDB
