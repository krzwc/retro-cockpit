<!-- https://github.com/yai333/PytestSeleniumE2EReactApp/tree/master/pytest -->
<!-- https://github.com/qualityshepherd/python-e2e-test-example -->

### These Tests:
* run python selenium e2e tests against an existing website
* make use of a page object pattern
* use [pytest](http://pytest.org/) for most of the heavy lifting
* run on Firefox or Chrome
* run tests in parallel (via [pytest-parallel](https://pypi.org/project/pytest-parallel/) (requires python3.6+)
* run api tests using [requests](http://docs.python-requests.org/en/master/)
* run on merge on [CI](https://app.codeship.com/projects/312669)

## Requirements
1. [python3](https://www.python.org/downloads/) `brew install python3`

## Install deps locally
`python3 -m venv selenium_venv`
`source selenium_venv/bin/activate`
`pip install -r requirements.txt`
1. if you want to run on firefox, [download geckodriver](https://github.com/mozilla/geckodriver/releases) and move to a folder on your path (eg. `/usr/local/bin`)

## Run Tests
1. in Chrome (default): `python3 -m pytest`
1. in Firefox `pytest --driver firefox`
1. in parallel `pytest --workers 2`

## Deactivate venv
`deactivate`