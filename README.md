[![image](https://github.com/reireias/billing-notifier/actions/workflows/image.yml/badge.svg)](https://github.com/reireias/billing-notifier/actions/workflows/image.yml) [![test](https://github.com/reireias/billing-notifier/actions/workflows/test.yml/badge.svg)](https://github.com/reireias/billing-notifier/actions/workflows/test.yml)
# billing-notifier
Notify to Slack billing report of AWS, GCP.

## Screenshot
![Screenshot from 2020-06-23 12-04-11](https://user-images.githubusercontent.com/24800246/85356399-d7717b00-b549-11ea-803f-e9866701b258.png)

## Usage
### run with node

```console
$ yarn install
$ WEBHOOK_URL=<webhook url> AWS_BUCKET=<aws bucket> AWS_PREFIX=<report prefix> node index.js
```

example

```console
AWS S3 bucket

billing-bucket
└── billing
    ├── 20200201-20200301
    │   ├── 00000000-1111-2222-3333-abcdefghijkl
    │   │   ├── billing-1.csv.gz
    │   │   └── billing-Manifest.json
    │   ├── 99999999-1111-2222-3333-abcdefghijkl
    │   │   ├── billing-1.csv.gz
    │   │   └── billing-Manifest.json
    │   └── billing-Manifest.json
    └── 20200301-20200401
        ├── 00000000-1111-2222-3333-abcdefghijkl
        │   ├── billing-1.csv.gz
        │   └── billing-Manifest.json
        ├── 99999999-1111-2222-3333-abcdefghijkl
        │   ├── billing-1.csv.gz
        │   └── billing-Manifest.json
        └── billing-Manifest.json

$ WEBHOOK_URL=<webhook url> AWS_BUCKET=billing-bucket AWS_PREFIX=billing node index.js
```

When `AWS_BUCKET` specified, notify AWS cost.

When `GCP_BUCKET` specified, notify GCP cost.

### run with docker

https://hub.docker.com/r/reireias/billing-notifier

```console
$ docker run --rm \
  -e WEBHOOK_URL=<webhook url> \
  -e AWS_BUCKET=<aws bucket> \
  -e AWS_PREFIX=<report prefix> \
  -e AWS_ACCESS_KEY_ID=<aws access key id> \
  -e AWS_SECRET_ACCESS_KEY=<aws secret access key> \
  reireias/billing-notifier:latest
```

## Environments
### Slack
`WEBHOOK_URL`: Slack Incoming Webhook URL for notification

## AWS
`AWS_BUCKET`: billing report bucket name
`AWS_PREFIX`: billing report prefix in bucket

## GCP
`GCP_BUCKET`: billing report bucket name
