![스크린샷 2024-11-21 094709](https://github.com/user-attachments/assets/e06d6577-bc87-43ca-b816-67176d08ef4e)
Canmore_Project 첫 팀 프로젝트

                               -------------------각자 맡은 역할----------------------
신상용 맡은부분 :  무한스크롤 버튼,  스크롤에 반응하는 업버튼 수파베이스 연동화 및 기능확인 , 라이크버튼 만들기,  코멘트 모달 슈퍼베이스 연동
권현준 맡은부분 : DB, 명예의 전당,팔로워 최신순 정렬,팔로워 모달창 최신 순 정렬 및 지정된 유저 피드페이지 이동,타임라인
권지현 맡은부분 : 메인페이지 (왼쪽 사이드바) , 수파베이스 이미지 저장 삭제 구현
최민석 맡은부분 : 워크프레임,css,회원가입 페이지,로그인 페이지
박준석 맡은부분 : 글쓰기 페이지 슈퍼베이스 연동,뉴스피드 홈화면에 렌더링,코멘트 모달 기능 구현,뉴스피드 수정 및 삭제 (작성자만 동작할 수 있도록 구현)
문다슬 맡은부분 : 라이크버튼 구현, 북마크 구현

                                 -------------------주요 기능----------------------
로그인(id,password를 DB에서 비교)를 성공해야 홈 화면으로 이동
회원가입 페이지에서 id,nickname,password값 받아서 DB에 저장
프로필 사진 수정,삭제 기능
자기소개 부분 수정 기능
팔로워(로그인 된 유저 최신순으로 나열)기능 구현
팔로워 목록 보기 모달창 구현 및 최신순으로 정렬 후 유저 클릭 시 그 유저의 피드(뉴스피드)로 이동
뉴스피드 화면에 보여주기
타임라인(본인이 작성한 피드보기)기능 구현
글쓰기 기능 구현
로그아웃 기능 구현
뉴스피드에 좋아요,댓글 달기 기능 구현
본인이 작성한 뉴스피드만 수정,삭제 기능 구현

                              -------------------구현 실패 기능----------------------
북마크 기능

                        -------------------프로젝트 과정중 어려웠던 내용---------------------
DB를 구성하는데 있어 supabase를 처음만지는거라 이 부분이 좀 어려웠고 코드컨벤션을 정하고 시작하지않아 이 부분에 대한 충돌이 있었다.
아무래도 첫 팀프로젝트라 다들 잘해보고 싶은 욕심에 충돌이 있었던거 같다.
supabase에서 제공해주는 함수를 사용함에 있어 처음 사용하는 부분이라 적응하는데 오랜 시간이 걸렸다.
깃허브 작업도 해본 조원도 있었겠지만 대부분 경험이 없어 푸시하는 과정에서 어려움을 겪었다.
