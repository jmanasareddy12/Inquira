import boto3
from botocore.exceptions import ClientError

from app.core.config import settings
from botocore.config import Config

class S3Service:

    s3 = boto3.client(
        "s3",
        region_name=settings.AWS_DEFAULT_REGION,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        endpoint_url=f"https://s3.{settings.AWS_DEFAULT_REGION}.amazonaws.com",
        config=Config(
            signature_version="s3v4",
            s3={"addressing_style": "virtual"},
        ),
    )

    BUCKET_NAME = settings.AWS_S3_BUCKET_NAME

    @staticmethod
    def upload_file(
        file_bytes: bytes,
        key: str,
        content_type: str,
    ):

        S3Service.s3.put_object(
            Bucket=S3Service.BUCKET_NAME,
            Key=key,
            Body=file_bytes,
            ContentType=content_type,
        )

        return key

    @staticmethod
    def delete_file(key: str):

        try:
            S3Service.s3.delete_object(
                Bucket=S3Service.BUCKET_NAME,
                Key=key,
            )

        except ClientError as e:
            print(e)

    @staticmethod
    def generate_view_url(key: str):

        url = S3Service.s3.generate_presigned_url(
            ClientMethod="get_object",
            Params={
                "Bucket": S3Service.BUCKET_NAME,
                "Key": key,
            },
            ExpiresIn=3600,
            HttpMethod="GET",
        )

        print(url)

        return url

    @staticmethod
    def generate_download_url(key: str):

            return S3Service.s3.generate_presigned_url(
                "get_object",
                Params={
                    "Bucket": S3Service.BUCKET_NAME,
                    "Key": key,
                    "ResponseContentDisposition": "attachment",
                },
                ExpiresIn=3600,
            )