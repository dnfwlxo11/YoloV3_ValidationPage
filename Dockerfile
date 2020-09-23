FROM node:12
MAINTAINER Daein Lim dnfwlxo11@naver.com

#어플리케이션 폴더를 Workdir로 지정 - 서버가동용
WORKDIR /home/daein/label_server

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production
 
# 앱 소스 추가
COPY . .

EXPOSE 3000

#배포버젼으로 설정 - 이 설정으로 환경을 나눌 수 있습니다.
ENV NODE_ENV=production
 
#서버실행
CMD ["node", "app.js"]