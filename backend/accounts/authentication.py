from django.http import JsonResponse
from django.utils import timezone

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import status

from accounts.models import User

REFRESH_TOKEN_EXP = 60 * 60 * 24 * 30
ACCESS_TOKEN_EXP = 60 * 15

"""
토큰을 생성할 때는 userId로 DB에 접근해서 정보들을 만든다
토큰을 decode 할때는 종합적인 user_info 가 나옴
"""


# JWT 토큰 decode
def decode_refresh_token(refresh_token):
    print('리프레쉬 토큰 디코드')
    refresh_token_obj = RefreshToken(token=refresh_token)
    payload = refresh_token_obj.payload

    user_info = {'userId': payload['userId'], 'nickname': payload['nickname'],
                 'isDancer': payload['isDancer'], 'profileImage': payload['profileImage']}

    return user_info


def decode_access_token(access_token):
    print('엑세스 토큰 디코드')
    access_token_obj = AccessToken(token=access_token)
    payload = access_token_obj.payload

    user_info = {'userId': payload['userId'], 'nickname': payload['nickname'],
                 'isDancer': payload['isDancer'], 'profileImage': payload['profileImage']}

    return user_info


def create_jwt_token(user_id, token_type, user_info={}):
    token = None
    try:
        if not user_info:
            user = User.objects.get(user_id=user_id)
            user_info['userId'] = user.user_id
            user_info['nickname'] = user.nickname
            user_info['isDancer'] = user.is_dancer
            user_info['profileImage'] = user.profile_image

        if token_type == 'refresh':
            print('리프레쉬 토큰 발급')
            token = RefreshToken()

            # 사용자 ID를 페이로드에 추가
            for key, value in user_info.items():
                token[key] = value

            # 만료 시간 설정 (예: 30일)
            token.set_exp(lifetime=timezone.timedelta(days=30))

        elif token_type == 'access':
            print('엑세스 토큰 발급')
            token = AccessToken()

            for key, value in user_info.items():
                token[key] = value
            token.set_exp(lifetime=timezone.timedelta(minutes=15))

        return str(token)
    except TokenError:
        print('토큰 발급 실패')
        return '토큰을 생성하지 못하였습니다.'


def generate_token(user_info):
    new_refresh_token = create_jwt_token(user_info['userId'],
                                         'refresh', user_info)
    new_access_token = create_jwt_token(user_info['userId'],
                                        'access', user_info)
    return (new_refresh_token, new_access_token)


def validate_access_token(access_token):
    try:
        access_token_obj = AccessToken(token=access_token)
        access_token_obj.verify()
        print('엑세스 토큰 유효성검사: 정상')

        return True
    except TokenError:
        # 서명 검증에 실패하여 변조가 있음을 의미
        print('엑세스 토큰 유효성검사: 엑세스 토큰 변조 확인됨')

        return False


def validate_refresh_token(token):
    try:
        refresh_token = RefreshToken(token)
        refresh_token.verify()
        print('리프레쉬 토큰 유효성검사: 정상')

        return True
    except TokenError:
        print('리프레쉬 토큰 유효성검사: 리프레쉬 토큰 변조 확인됨')

        return False


def handle_invalid_token():
    print('invalid-token handler')
    response = JsonResponse({'user': False,
                            'message': '변조된 토큰입니다.'},
                            status=status.HTTP_401_UNAUTHORIZED)
    # 토큰 삭제
    response.set_cookie('Refresh-Token', '',
                        max_age=REFRESH_TOKEN_EXP, httponly=True)
    response.set_cookie('Access-Token', '',
                        max_age=ACCESS_TOKEN_EXP)

    return response
