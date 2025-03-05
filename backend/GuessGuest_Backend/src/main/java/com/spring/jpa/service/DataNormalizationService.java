package com.spring.jpa.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class DataNormalizationService {

  public List<Double> minMaxNormalize(List<Integer> data) {
      int min = Integer.MAX_VALUE;
      int max = Integer.MIN_VALUE;

      for (int value : data) {
          if (value < min) {
              min = value;
          }
          if (value > max) {
              max = value;
          }
      }

      List<Double> normalizedData = new ArrayList<>();
      for (int value : data) {
          double normalizedValue = (double) (value - min) / (max - min);
          normalizedData.add(normalizedValue);
      }

      return normalizedData;
  }

  public List<Double> zScoreNormalize(List<Integer> data) {
      double mean = 0;
      double sum = 0;

      for (int value : data) {
          sum += value;
      }
      mean = sum / data.size();

      double variance = 0;
      for (int value : data) {
          variance += Math.pow(value - mean, 2);
      }
      variance /= data.size();

      double standardDeviation = Math.sqrt(variance);

      List<Double> normalizedData = new ArrayList<>();
      for (int value : data) {
          double normalizedValue = (double) (value - mean) / standardDeviation;
          normalizedData.add(normalizedValue);
      }

      return normalizedData;
  }

  public List<Double> robustNormalize(List<Integer> data) {
      List<Integer> sortedData = new ArrayList<>(data);
      Collections.sort(sortedData);

      double median = sortedData.size() % 2 == 0
          ? (sortedData.get(sortedData.size() / 2 - 1) + sortedData.get(sortedData.size() / 2)) / 2.0
          : sortedData.get(sortedData.size() / 2);

      int q1Index = sortedData.size() / 4;
      int q3Index = sortedData.size() * 3 / 4;
      double q1 = sortedData.get(q1Index);
      double q3 = sortedData.get(q3Index);

      double iqr = q3 - q1;

      List<Double> normalizedData = new ArrayList<>();
      for (int value : data) {
          double normalizedValue = (double) (value - median) / iqr;
          normalizedData.add(normalizedValue);
      }

      return normalizedData;
  }

  public List<Double> logTransform(List<Integer> data) {
      List<Double> transformedData = new ArrayList<>();
      for (int value : data) {
          double transformedValue = Math.log(value + 1);
          transformedData.add(transformedValue);
      }
      return transformedData;
  }

  public List<Double> maxAbsNormalize(List<Integer> data) {
      int maxAbs = Integer.MIN_VALUE;

      for (int value : data) {
          maxAbs = Math.max(maxAbs, Math.abs(value));
      }

      List<Double> normalizedData = new ArrayList<>();
      for (int value : data) {
          double normalizedValue = (double) value / maxAbs;
          normalizedData.add(normalizedValue);
      }

      return normalizedData;
  }
}
