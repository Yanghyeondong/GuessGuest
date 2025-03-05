package com.spring.jpa.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class CosineSimilarityService {
    private List<List<Double>> housesData;
    private List<Long> houseIds;

    public CosineSimilarityService() {
        this.housesData = new ArrayList<>();
        this.houseIds = new ArrayList<>();
    }

    public void train(List<Long> houseIds, List<List<Double>> houseData) {
        this.housesData = houseData;
        this.houseIds = houseIds;
    }

    public List<Long> classify(List<Double> userData) {
        List<Long> topKHouseIds = new ArrayList<>();
        List<Double> similarities = new ArrayList<>();

        for (int i = 0; i < housesData.size(); i++) {
            List<Double> houseData = housesData.get(i);

            double dotProduct = 0;
            for (int j = 0; j < houseData.size(); j++) {
                dotProduct += userData.get(j) * houseData.get(j);
            }

            double userMagnitude = 0;
            for (int j = 0; j < userData.size(); j++) {
                userMagnitude += Math.pow(userData.get(j), 2);
            }
            userMagnitude = Math.sqrt(userMagnitude);

            double houseMagnitude = 0;
            for (int j = 0; j < houseData.size(); j++) {
                houseMagnitude += Math.pow(houseData.get(j), 2);
            }
            houseMagnitude = Math.sqrt(houseMagnitude);

            double similarity = dotProduct / (userMagnitude * houseMagnitude);

            similarities.add(similarity);
//            System.out.println("similarity: " + similarity);
        }

        List<Integer> sortedIndices = new ArrayList<>();
        for (int i = 0; i < similarities.size(); i++) {
            sortedIndices.add(i);
        }

        Collections.sort(sortedIndices, (i1, i2) -> Double.compare(similarities.get(i2), similarities.get(i1)));

        for (int i = 0; i < sortedIndices.size(); i++) {
            int sortedIndex = sortedIndices.get(i);
            topKHouseIds.add(houseIds.get(sortedIndex));
        }

        return topKHouseIds;
    }
}
