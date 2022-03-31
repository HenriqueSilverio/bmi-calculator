# BMI Calculator

Simple app that checks your Body Mass Index (BMI).

## Docker

### Build

```bash
docker build -t bmi-calculator .
```

### Run

```bash
docker run --rm -it --name bmi-calculator bmi-calculator
```

### Access

```bash
docker exec -it bmi-calculator /bin/sh
```
