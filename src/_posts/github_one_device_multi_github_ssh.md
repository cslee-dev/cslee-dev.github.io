안녕하세요!, Backend Engineer CSLEE 입니다.  
노트북 한대에서 두개 이상의 계정을 연결해 사용해야 하는 경우가 있습니다.  
SSH를 통한 연결 방식을 활용하여 변경이 가능하며 이에 대해 간단히 정리하려 합니다.

[GitHub SSH 새 SSH 키 생성 및 ssh-agent에 추가](https://docs.github.com/ko/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)을 참고하고 부분 수정했음을 알립니다.

# 목차
1. 계정 정보
2. SSH Key 생성 및 ssh-agent 작업
3. GitHub에 SSH Public Key 추가
4. SSH Connection 테스트
5. Clone 테스트

# 계정 정보

github에 사용하는 계정을 정보와 파일명을 아래와 같이 가정하겠습니다. 아래 명령어를 실행할 때 고려해서 치환하여 사용해주세요.

| name | email | filename |
| --- | --- | --- |
| cslee | [cslee.dev@gmail.com](mailto:cslee.dev@gmail.com) | git-cslee |
| cslee2 | [cslee2.dev@example.com](mailto:cslee2.dev@example.com) | git-cslee2 |

> 참고 macOs 기반으로 설명합니다.

# SSH Key 생성

터미널을 통해 **~/.ssh** 디렉토리에서 새로운 SSH Key를 생성하는 과정을 진행합니다.

1.  Terminal(터미널)을 엽니다.
2.  **~/.ssh** 디렉토리로 이동합니다.
    ```shell
    cd ~/.ssh
    ```
    **참고** : 만약 **~/.ssh** 디렉토리가 없다면 **~/.ssh** 디렉토리를 **생성**해주세요
    ```shell
    > cd: no such file or directory: /Users/YOU/.ssh
    ```
    ```shell
    mkdir ~/.ssh
    ```

3. 아래 텍스트를 붙여넣은 후 예제에서 사용한 이메일과 파일명을 You 이메일 주소, 파일명으로 바꿔서 붙여넣습니다.  
    ```shell 
    ssh-keygen -t ed25519 -C "cslee2.dev@gmail.com" -f "git-cslee"
    ```
    ```shell 
    ssh-keygen -t ed25519 -C "cslee2.dev@gmail.com" -f "git-cslee2"
    ```
    **참고** : 만약 Ed25519 알고리즘을 지원하지 않는 레거시 시스템을 사용하는 경우 다음을 사용합니다.
    ```shell
    ssh-keygen -t rsa -b 4096 -C "cslee.dev@gmail.com" -f "git-cslee"
    ```

    이전에 동일한 이름으로 SSH 키를 만든적이 있는 경우 ssh-keygen이 다른 이름으로 다시 작성할 수 있도록 요청합니다.
    ```shell
   > Enter a file in which to save the key (/Users/YOU/.ssh/id_ALGORITHM): [Press enter]
    ```
4. 프롬프트에 보안 암호를 입력합니다.

    SSH 키를 생성할 때 암호를 추가하여 키를 추가로 보호할 수 있습니다. 따라서 암호를 입력해주세요. ( Recommended )
    ```shell
    > Enter passphrase (empty for no passphrase): [Type a passphrase] 
    > Enter same passphrase again: [Type passphrase again]
    ```
5. 그러면 제공된 이메일을 레이블로 사용하여 새 SSH 키가 생성됩니다.
    ```shell
    > Generating public/private ed25519 key pair.
    ```

6. 백그라운드에서 ssh-agent를 시작합니다.
    ```shell
    eval "$(ssh-agent -s)"
    ```
7. config 파일 설정을 시작합니다.
   - 먼저 **~/.ssh/config**파일이 기본 위치에 있는지 확인합니다.
   ```shell
   open ~/.ssh/config 
   > The file /Users/YOU/.ssh/config does not exist.
   ```
   - 파일이 없으면 파일을 만듭니다.
    ```shell 
    touch ~/.ssh/config
    ```
    - **~/.ssh/config** 파일을 열고 다음 줄을 포함하도록 파일을 수정합니다.
    ```shell
      Host github.com-cslee 
        HostName github.com 
        AddKeysToAgent yes 
        UseKeychain yes 
        IdentityFile ~/.ssh/git-cslee 
    
      Host github.com-cslee2 
        HostName github.com 
        AddKeysToAgent yes 
        UseKeychain yes 
        IdentityFile ~/.ssh/git-cslee2
    ``` 
   - 만약 키에 암호를 추가하지 않도록 선택한 경우 UseKeychain 줄을 생략해야 합니다.
   - **Bad configuration option: usekeychain** 에러가 발생하면 줄을 추가해야합니다.
    ```shell 
    Host github.com-cslee 
      IgnoreUnknown UseKeychain 
      HostName github.com 
      생략...
    ```
8. ssh-agent 에 cslee와 cslee2의 SSH 프라이빗 키를 추가하고 키 집합에 암호를 저장합니다.
    ```shell 
    ssh-add --apple-use-keychain ~/.ssh/git-cslee
    ```
   ```shell 
   ssh-add --apple-use-keychain ~/.ssh/git-cslee2
    ```
    **참고** : 만약 키에 암호를 추가하지 않기로 선택한 경우 **--apple-use-keychain** 옵션 없이 명령을 실행합니다.
   ```shell
   ssh-add ~/.ssh/git-cslee
   ```

# GitHub 계정에 SSH Public Key 추가
SSH 공개키를 복사해 각 계정에 추가해줘야 합니다. 본문에서는 cslee 계정으로 한번 진행하지만 다른 계정도 동일한 과정을 수행해야 합니다.

1. **git-cslee.pub** 파일 내용 복사하기
    ```shell
    pbcopy < ~/.ssh/git-cslee.pub
    ```
   

2. GitHub 우측 상단 코너의 햄버거 메뉴 클릭, Settings 메뉴를 클릭하기

![](https://blog.kakaocdn.net/dn/dsG6Kn/btsFfvtnGYh/KFCb3BKQwhWwCichBbrmQk/img.png)


3. 좌측 메뉴에서 SSH and GPG Keys 누르고 New SSH Key 누르기

[##_Image|kage@XGvX4/btsFgPxTfTU/YdVlvhkvTKBYBMK9nnWF1K/img.png|CDM|1.3|{"originWidth":1642,"originHeight":1154,"style":"alignLeft","filename":"스크린샷 2024-02-24 오후 4.41.26.png"}_##]


4. Title, Key 입력하기

    Title 에는 해당 키의 용도 혹은 사용처에 대해서 설명하고, Key 항목에서 cmd + v 누르시면 pbcopy로 복사한 내용이 붙여집니다. Add SSH Key 를 눌러줍니다.



# SSH 연결 테스트하기    
연결이 성공적으로 수행되었는지 확인합니다.
```shell
ssh -T git@github.com-cslee
```
```shell
Hi cslee-dev! You've successfully authenticated, but GitHub does not provide shell access.
```

# SSH로 clone 받기

클론 주소를 복사해오면 아래와 같은 주소를 받아오게 됩니다. Host 주소가 github.com 으로 되어 있는걸 볼 수 있습니다.

```shell
git@github.com:dev-django/optimization.git
```

이를 config에 설정한 Host 정보로 변경해줍니다. 저는 cslee2 계정을 사용한다고 가정하겠습니다.

```shell
git clone git@github.com-cslee2:dev-django/optimization.git
```

ssh를 활용할 때 config에 적힌 Host github.com-cslee2 와 매치되고 HostName 재정의를 통해 github.com 으로 치환 및 계정 정보 입력 작업이 완료 되는걸 볼 수 있습니다.

# 5\. 마치며

이상으로 깃헙 계정 여러개를 하나의 기기에서 사용할 수 있는 방법을 간단하게 정리해 봤습니다. 추가적인 팁은 이렇게 받아온 레포에서 작업할시 커밋하기전에 git config 에서 user.name, user.email 꼭 확인하세요! 다른 계정으로 설정되어 있는 경우가 간혹 있습니다.