# Expo router with supabase auth sample

### ⚠️ 이 프로젝트는 현재 expo-router@1.0.0-rc7 을 기준으로 동작을 확인함

[![CI](https://github.com/dooboolab/dooboo-expo-router/actions/workflows/ci.yml/badge.svg)](https://github.com/dooboolab/dooboo-expo-router/actions/workflows/ci.yml)

### 프로젝트 포인트
1. expo router 사용법
2. expo router를 사용한 인증 흐름 구현 방법
3. expo 환경에서 supabase를 통해 `android`, `ios`, `web`에서 동작하는 Oauth 인증 방법

----

## 프로젝트 세팅

#### 환경 변수 값 얻는 법
- [Supabase](https://supabase.com/)에서 프로젝트를 생성한 후, 프로젝트 대시보드로 이동
- 좌측 하단의 `Project Settings`를 클릭한 후, `API` 탭을 선택
- 해당 화면에서 `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`를 얻을 수 있다.

1. `env` 파일 생성 후 환경 변수 입력
  ```sh
  cp .env.sample .env
  ```
    
2. 프로젝트 시작
  ```sh
  yarn start
  ```
#### *** 만약 Supabase 프로젝트로 소셜 로그인을 연동하지 않았다면, `Email/Password` 로그인만 가능하다.
----

## Supabase를 통한 로그인 Overview

<img width=500 src="https://user-images.githubusercontent.com/58724686/220531204-86fbe5b3-a08c-42f5-9438-56150d7e2b2d.png"/>

- expo 환경에서 supabase를 통한 `OAuth` 인증을 연결하면서 생겨나는 버그로 인한 개발 맥락은 [PR](https://github.com/crossplatformkorea/expo-supabase-auth-sample/pull/1)을 참고한다.

### 모바일(Android, Ios)
 모바일의 경우 [expo-auth-session](https://docs.expo.dev/versions/latest/sdk/auth-session/)을 사용하여 `web base` 인증을 진행한다. `expo-auth-session`은 `expo-web-broswer`를 사용하여 `supabase`에 인증 요청을 보내고, 그 결과를 받아서 앱으로 전해준다.

### 웹
 `supabase`에서 제공하는 API를 사용하여 로그인을 진행한다.

### 일반적인 OAuth 기반 인증 개발 흐름
1. 서비스 제공 업체 사이트(ex. google, facebook)에 가서 계정과 프로젝트를 생성
    - 서비스에 따라 앱 Url, 개인정보 처리 Url 등을 요구함
2. 생성한 프로젝트에 클라이언트로부터 `OAuth` 요청을 허용할 `URL` 을 입력 해준다. 보통 `Authorized Redirection URI` (`승인된 리디렉션 URI`) 등과 같은 명칭을 가지고 있다.
3. `URI` 등의 정보를 입력하면 `CLIENT_ID` 및 `CLIENT_SECRET` 를 얻을 수 있다. 이 값은 `Oauth Provider`에 요청을 보낼 때 사용된다. `Supabase` 와 같은 `Saas` 를 이용할 경우에는 해당 서비스에 `CLIENT_ID` 와 `CLIENT_SECRET` 을 입력해주고 `OAuth` 요청을 위임할 수 있다.


---
### Supabase로 소셜 로그인 설정하는 방법
- 소셜 로그인을 위해서는 `Supabase`에 Social Provider를 추가해야한다.

<details>
  <summary>펼치기</summary>
  <br>
  <ol>
    <li>Supabase 로그인 후, 프로젝트를 생성한다.</li>
    <li>
      좌측 사이드바를 통해 Authentication -> URL Configuration 경로에서 Site URL과 Redirect URLs를 입력해준다. 개발 단계의 경우 localhost를 입력한다.
      <ul>
        <li>Redirect URLs에는 http://<your domain>/auth/callback 값을 넣어준다.</li>
      </ul>
      <br/>
      <img width="738" alt="Screen Shot 2023-02-22 at 2 58 30 PM" src="https://user-images.githubusercontent.com/58724686/220535728-16fd1eec-9ccf-4123-b05f-3f7147871365.png">
    </li>
    <li>
      Authentication 화면 좌측 Configuration 하단에 Providers탭이 있다. 여기서 사용할 Provider를 활성화하고 해당 Provider에서 얻은 key와 secret을 설정해준다. Provider마다 명칭을 조금씩 다를 수 있다.
    </li>
    <li>
      Supabase Redirection URL: 연결을 원하는 Provider를 클릭하면 하단에 Redirect URL이 있다. Redirect URL은 모든 Provider에 같은 값이 적용된다.
      <br/><br/>
      <img width="862" src="https://user-images.githubusercontent.com/58724686/220535390-d198fb93-98c2-4f88-b4d4-042875c6ac6d.png">
    </li>
  </ol>
</details>




## 소셜 로그인 제공업체 별 Credential 생성하는 방법

### Google 로그인
<details>
  <summary>펼치기</summary>
  <ol>
    <li>GCP(https://cloud.google.com) 로 가서 로그인 후, 프로젝트를 생성한다.
      <ul>
        <li>프로젝트를 생성하거나 선택하면, 해당 프로젝트의 대시보드로 이동될 것이다.</li>
        <li>만약 이동하지 않을 시에는 상단 좌측의 토글 박스에서 원하는 프로젝트를 선택한다.</li>
      </ul>
    </li>
    <li>
      프로젝트 대시보드 상단의 검색창에서 `OAuth` 라고 검색한다. 입력 후 나타나는 리스트 중 `Oauth 동의 화면` 을 클릭한다.
      <br/>
      <img width="789" src="https://user-images.githubusercontent.com/58724686/220538782-73e18a18-9aba-4316-ad85-c6f66825ca74.png">
    </li>
    <li>
      동의 화면에서 외부를 선택하고 만들기를 클릭한다.
      <br/>
      <img width="668" src="https://user-images.githubusercontent.com/58724686/220538944-db4bede1-d85d-44bf-8416-e7673c3193f2.png">
    </li>
    <li>
      이후 필요한 정보를 입력하고 하단의 `저장 후 계속` 버튼을 클릭한다.
      <br/>
      <img width="785" src="https://user-images.githubusercontent.com/58724686/220539095-80a8ef32-03e5-4b64-8c85-f12ecceba449.png">
      <ul>
        <li>* 표시가 있는 필드만 우선 입력하고 나머지 필드는 생략할 수 있다.</li>
        <li>이후 나타나는 화면들도 우선 `저장 후 계속` 버튼을 통해 생략한다.</li>
      </ul>
    </li>
    <li>
      위 과정을 끝낸 후, 좌측 사이드바를 통해 사용자 인증 정보화면으로 이동한다.
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220539180-12cc5c58-e4fc-4833-81f9-4dd7cd23b924.png">
    </li>
    <li>
      페이지 상단의 `사용자 인증 정보 만들기` 버튼을 누르고  `OAuth 클라이언트 ID` 를 클릭 한다.
      <br/>
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220539393-bce99d5b-d86d-49e3-801a-92f9bef4b5ae.png">
    </li>
    <li>expo-auth-session을 통한 Web base 인증을 이용하기 때문에, 애플리케이션 유형은 `웹 애플리케이션` 을 선택한다.</li>
    <li>위 과정을 끝낸 후, 좌측 사이드바를 통해 사용자 인증 정보화면으로 이동한다.</li>
    <li>
      `승인된 자바스크립트 원본` 과 `승인된 리디렉션 URI` 에 `URI` 추가 버튼을 누르고, [Supabase Redirection URL](#Supabase로 소셜 로그인 설정하는 방법)을 입력 해준다.
    </li>
    <li>
      필요정보를 입력한 후, 만들기를 누르면 클라이언트 ID와 클라이언트 보안 비밀번호 정보가 표시된 모달을 확인할 수 있다.
      <br/>
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220539891-f6f5103a-3e1a-4ae9-aa0f-4f9801f76d9b.png">
      <ul>
        <li>만약 실수로 모달을 꺼버렸다면, `Oauth 2.0 클라이언트 ID` 테이블에서 앱이름을 찾은 후, 오른쪽 끝에 다운로드 버튼을 누르면 된다.</li>
      </ul>
    </li>
    <li>복사한 클라이언트 ID와 클라이언트 보안 비밀번호는 `Supabase 소셜 로그인 설정하는 방법`을 참고하여 값을 설정해주면 된다.</li>
  <ol>
</details>


### Facebook 로그인
<details>
  <summary>펼치기</summary>
  <ol>
    <li>페이스북 개발자 사이트(https://developers.facebook.com/)로 가서 로그인을 한다.</li>
    <li>우측 상단의 `My Apps` 를 선택한다.</li>
    <li>
      상단의 `앱 만들기` 버튼을 클릭한다.
      <br/>
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220541544-458ced6d-6272-4dda-81ad-d3d8e9d089d0.png">
      <ul>
        <li>앱 유형 선택은 앱의 성격에 따라 선택할 수 있다. 일반적인 앱에서 페이스북 로그인을 이용하고자 한다면 소비자를 선택하면 된다.</li>
        <li>하단의 `다음` 버튼을 클릭한 후, 앱 이름과 연락처 등을 입력한 후, `앱 만들기` 버튼을 누른다.</li>
      </ul>
    </li>
    <li>
      생성 후 나타나는 앱에 제품 추가 화면에서 `Facebook 로그인` 의 설정을 클릭 한다.
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220541766-15416a8a-7b43-4859-a5e7-ef3d883e9617.png">
    </li>
    <li>
      이후 나타나는 빠른 시작 화면을 무시하고, 좌측 사이드바에서 설정 버튼을 클릭 한다.
      <br/>
      <img width="376" src="https://user-images.githubusercontent.com/58724686/220542137-d5d09fd8-9768-4b9a-a5fa-045cf66d46ca.png">
    </li>
    <li>Supabase Redirection URL을 유효한 OAuth 리디렉션 URI 항목에 추가해준다.</li>
    <li>하단의 변경 내용 저장 버튼을 눌러 준다.</li>
    <li>
      페이스북 로그인에서 `Supabase` 로그인에 필요한 정보를 넘겨주는지 확인하기 위해 좌측 사이드바에서 `앱 검수 -> 권한 및 기능` 을 클릭한다.
      <br/>
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220542360-44bef576-bdfa-4be3-ad74-e4d8e7323b53.png">
      <ul>
        <li>
          권한 리스트 중, `email` 과 `public_profile` 이 사용할 수 있음 상태인지 확인한다. 프로덕션에서 사용할 경우에는, 고급 엑세스 기능을 사용해야 한다. 이를 위해서는 개인정보 처리 방침 등 페이스북 측에서 요구하는 요건을 갖추어야 한다. 정보 접근에 관한 자세한 사항은 여기(https://developers.facebook.com/docs/graph-api/overview/access-levels )를 참고
        </li>
      </ul>
    </li>
    <li>좌측 사이드바에서 설정 -> 기본 설정을 클릭하면, 앱 ID와 앱 시크릿 코드를 얻을 수 있다. `Supabase 소셜 로그인 설정하는 방법`을 참고하여 값을 설정해주면 된다.</li>
  </ol>
</details>

    
### Github 로그인
<details>
  <summary>펼치기</summary>
  <ol>
    <li>깃허브 사이트(https://github.com) 로 이동한다.</li>
    <li>
      로그인 후, 우측 상단의 프로필을 누르고, 설정을 클릭한다.
      <br/>
      <img width="556" src="https://user-images.githubusercontent.com/58724686/220543684-c1d5b6f5-3fa9-4d42-8fa9-e810ace81b4d.png">
    </li>
    <li>
      설정 페이지의 좌측 사이드바 하단에 Developer settings 탭을 클릭한다.
      <br/>
      <img width="345" src="https://user-images.githubusercontent.com/58724686/220543868-3bdad344-46a8-439e-bfe9-8dbbf6c76063.png">
    </li>
    <li>화면 좌측 사이드 바에서 Oauth Apps 탭을 클릭한다.</li>
    <li>
      우측의 New OAuth App 을 클릭한다.
      <br/>
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220543995-d2b78c5d-661b-4e8b-aff0-ac3e97f0ef3d.png">
      <ul>
        <li>앱 이름과 URL 등의 정보를 입력한다. URL 은 우선 localhost 를 입력해도 된다.</li>
        <li>Supabase Redirection URL을 Authorization callback URL 에 입력하고 Resister application 버튼을 클릭한다.</li>
      </ul>
    </li>
    <li>
      생성된 프로젝트에서 Client ID와 Client secrets를 얻을 수 있다.
      <ul>
        <li>Client secrets은 Generate a new client secret을 통해 얻을 수 있다.</li>
        <li>깃허브는 한번 생성된 Client secrets 을 다시 보여주지 않으므로, 따로 잘 저장해야 한다.</li>
      </ul>
    </li>
    <li>Supabase 소셜 로그인 설정하는 방법을 참고하여 값을 설정해주면 된다.<li/>
  </ol>
</details>


### Apple 로그인
- ⚠️ 애플로그인은 애플 프로그램에 가입되어 있지 않다면 진행할 수 없음
- [참고 블로그](https://medium.com/identity-beyond-borders/how-to-configure-sign-in-with-apple-77c61e336003)
    
#### 참고 사항
- Apple 로그인은 과정이 가장 복잡하기 때문에 순서대로 하나씩 따라가는 것을 추천함.
- 3번 과정에서 얻은 `serviceId`와 마지막 5번 과정에서 얻은 `client_secret`을 Supabase 소셜 로그인 설정하는 방법을 참고하여 값을 설정해주면 된다.

<details>
  <summary>1. 로그인 및 계정 확인</summary>
  <ol>
    <li>애플 개발자 사이트(https://developer.apple.com/ )로 이동한다.</li>
    <li>
      우측 상단에 Account 를 클릭해서 로그인을 한다.
      <br/>
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220546249-321b44cf-f7f4-4275-854a-a2aeba106400.png">
      <ul>
        <li>애플 프로그램에 가입하지 않았다면 로그인 후에 위와 같은 화면이 보이지 않을 것이다.</li>
      </ul>
    </li>
  </ol>
</details>
    
<details>
  <summary>2. App Id 얻기</summary>
  <ol>
    <li>Account 화면의 Rrogram resources 영역에서 Certificates, Identifiers & Profiles 하단의 Identifiers 를 클릭한다.</li>
    <li>Identifiers 타이틀 오른쪽에 + 버튼을 클릭한다.</li>
    <li>
      Register a new identifier 에서 App IDs 를 선택하고 continue 를 클릭한다.
      <br/>
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220548662-991e35cb-2e90-4f92-8a92-84da60002577.png">
    </li>
    <li>App 타입을 선택하고  continue 를 클릭한다.</li>
    <li>
      앱에 대한 설명과 Bundle ID를 설정한다.
      <br/>
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220548788-2c9e100e-89a3-4233-8f31-36def0956ac6.png">
    </li>
    <li>
      Capabilities 테이블 하단에서 Sign in with Apple 을 선택한다.
      <br/>
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220548880-4ad3c0c2-9ae6-4f9d-bd3e-54e8ec4fc08b.png">
    </li>
    <li>우측의 continue 와 register 버튼을 연달아 클릭한다.</li>
  </ol>
</details>

<details>
  <summary>3. Service Id 얻기</summary>
  <ol>
    <li>App Id 얻기 의 1~2번을 반복한 후, 이번엔 Services IDs를 선택하고 continue를 클릭한다.</li>
    <li>앱 설명을 쓰고, Bundle ID를 설정한다. App Id 얻기 에서 사용했던 아이디와 유사하게 설정하려면 앞에 prefix를 붙일 수 있다. (ex. app.com.supabaseexample)</li>
    <li>우측의 continue 와 register 버튼을 연달아 클릭한다.</li>
    <li>`Identifiers` 화면에서 생성된 `Service ID` 를 클릭한다.</li>
    <li>`Sign in with Apple` 을 체크하고 `Configure` 버튼을 클릭한다.</li>
    <li>
      나타난 모달에서 필요한 정보를 입력한다.
      <br/>
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220564586-2bda5cf9-2eb0-4f27-8ad4-becc8552aacf.png">
      <ol>
        <li>Primary App ID 는 [App Id 얻기]에서 생성한 번들 아이디를 선택한다.</li>
        <li>Domains and Subdomains에 홈페이지 url을 입력한다. 이때 'https://' 와 같은 scheme은 빼고 입력한다.</li>
        <ol>
          <li>
            애플은 localhost를 허용하지 않는다. 만약 배포된 url이 없다면 host 파일 설정을 통해 로컬 주소를 등록할 수 있다.<br/>
            참고 사이트: https://www.hostinger.com/tutorials/how-to-edit-hosts-file
          </li>
        </ol>
        <li>Returns URLs에 Supabase Redirection URL을 입력한다.</li>
        <li>Done 을 클릭해 설정을 종료한다.</li>
      </ol>
    </li>
    <li>continue 및 save 를 연달아 클릭한다.</li>
  </ol>
</details>

<details>
  <summary>4. SecretKey 다운 받기</summary>
  <ol>
    <li>
      Certificates, Identifiers & Profiles 화면 좌측 사이드바에서 Keys 탭을 클릭한다.
      <br/>
      <img width="800" src="https://user-images.githubusercontent.com/58724686/220566229-fa8f597d-cbb7-4d6e-be10-341fe72d5ecd.png">
    </li>
    <li>Keys 타이틀 오른쪽의 + 버튼을 클릭한다.</li>
    <li>키 이름을 입력한 후, 하단의 Sign in with apple을 선택하고 Configure를 클릭한다.</li>
    <br/>
    <img width="800" src="https://user-images.githubusercontent.com/58724686/220566614-506aa388-6d7e-4973-9e82-a2c741dfb445.png">
    <ul>
      <li>Primary App ID에 이전에 생성한 Service Id를 선택해준다.</li>
    </ul>
    <li>
      continue 및 save 를 연달아 클릭한 후, Download 버튼을 눌러준다.
      <ul>
        <li>다운로드한 Secret Key의 파일명은 [Authkey_xxxxxx.p8]의 형태이다.</li>
      </ul>
    </li>
  </ol>
</details>
        
<details>
  <summary>5. client_secret 생성하기</summary>
  
  <ol>
    <li>
      앞 단계에서 다운받은 secret key 파일을 사용하여 client_secret을 생성한다.
      <ul>
        <li>
          client_secret은 Apple(https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens)에서 요구하는 알고리즘으로 생성된 토큰이어야 한다.
        </li>
        <li>
          요건을 충족하는 토큰을 만들기 위해, Ruby를 사용한다. Ruby가 다운로드되어 있지 않은 경우, https://www.ruby-lang.org/en/downloads/ 에서 다운로드를 선행한다.
        </li>
      </ul>
    </li>
    <li>
      먼저 토큰 생성을 위해 필요한 [ruby-jwt] 패키지를 설치한다. => [sudo gem installl jwt]
    </li>
  </ol>
  
  3. 앞 단계에서 다운로드 받은 secret key 파일과 같은 경로에 secret_gen.rb 파일을 생성하고 아래 스크립트를 입력한다.<br/>
    
      ```ruby
      require "jwt"

      key_file = "secret key 경로 ex. ./AuthKey_xxxxxxxxx.p8"
      team_id = "애플 팀 아이디"
      client_id = "Service ID 얻기 과정에서 얻은 ID 값 ex. app.supabaseexample"
      key_id = "다운받은 secret key 파일명에서 AuthKey 다음에 있는 값 ex. xxxxxxxxx"

      validity_period = 180 # In days. Max 180 (6 months) according to Apple docs.

      private_key = OpenSSL::PKey::EC.new IO.read key_file

      token = JWT.encode(
        {
          iss: team_id,
          iat: Time.now.to_i,
          exp: Time.now.to_i + 86400 * validity_period,
          aud: "https://appleid.apple.com",
          sub: client_id
        },
        private_key,
        "ES256",
        header_fields=
        {
          kid: key_id
        }
      )
      puts token
      ```
  
  4. 스크립트를 작성했다면 아래 명령어로 토큰을 생성 해준다.
  ```ruby
  secret_gen.rb > client_secret.txt
  ```
</details>
    
    
    
    
    

 

