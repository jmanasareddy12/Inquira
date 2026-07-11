import boto3
from botocore.exceptions import ClientError

from app.core.config import settings


class S3Service:

    s3 = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_DEFAULT_REGION,
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
    def generate_url(key: str):

        return S3Service.s3.generate_presigned_url(
            "get_object",
            Params={
                "Bucket": S3Service.BUCKET_NAME,
                "Key": key,
            },
            ExpiresIn=3600,
        )