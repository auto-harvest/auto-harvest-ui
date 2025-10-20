This report summarizes the results of using an **IBk (K-Nearest Neighbors) classification algorithm** for email classification, distinguishing between "spam" and "emai" (legitimate email). Similar to previous analyses, the **SMOTE (Synthetic Minority Over-sampling Technique) filter** was applied during the training phase to balance the class distribution, specifically `weka.filters.supervised.instance.SMOTE -C 0 -K 5 -P 53.79 -S 1`. The model was evaluated using **10-fold cross-validation** on a dataset of 4601 instances, each with 9 attributes.

---

### **Key Findings from the Evaluation**

- **Overall Accuracy:** The algorithm correctly classified **87.24%** of instances (4014 out of 4601 emails). This is a strong performance, though slightly lower than the Naive Bayes with SMOTE result.
- **Kappa Statistic:** A **Kappa statistic of 0.7353** indicates substantial agreement between the algorithm's predictions and the actual classifications, suggesting a reliable model.
- **Error Measures:**
    - **Mean Absolute Error (MAE):** 0.130
    - **Root Mean Squared Error (RMSE):** 0.348 The MAE is quite low, but the RMSE is notably higher than the previous Naive Bayes models, which might suggest larger prediction errors for some instances.

---

### **Detailed Performance by Class**

The IBk algorithm with SMOTE shows a more balanced performance across the two classes:

|                                 |                           |                            |                      |
| ------------------------------- | ------------------------- | -------------------------- | -------------------- |
| **Metric**                      | **Spam (Positive Class)** | **Email (Negative Class)** | **Weighted Average** |
| **True Positive Rate (Recall)** | 0.864                     | 0.878                      | 0.872                |
| **False Positive Rate**         | 0.122                     | 0.136                      | 0.130                |
| **Precision**                   | 0.821                     | 0.909                      | 0.874                |
| **F-Measure**                   | 0.842                     | 0.893                      | 0.873                |
| **ROC Area**                    | 0.886                     | 0.886                      | 0.886                |
| **PRC Area**                    | 0.811                     | 0.893                      | 0.861                |

- **"Spam" Classification:**
    - The **recall (True Positive Rate) for spam is 0.864**, indicating that 86.4% of actual spam emails were correctly identified. This is a very high recall for spam, suggesting the model is effective at catching unwanted emails.
    - The **precision for spam is 0.821**. This means that 82.1% of emails predicted as spam were indeed spam.
    - The **False Positive Rate for spam is 0.122**, which means 12.2% of legitimate emails were incorrectly flagged as spam. This is a higher false positive rate for spam compared to the Naive Bayes models.
- **"Emai" (Legitimate Email) Classification:**
    - The **recall for "emai" is 0.878**, meaning 87.8% of legitimate emails were correctly identified.
    - The **precision for "emai" is 0.909**, indicating that 90.9% of emails predicted as "emai" were truly legitimate.
    - The **False Positive Rate for "emai" is 0.136**, which implies that 13.6% of actual spam emails were incorrectly classified as "emai" (missed spam).
- **Overall Balance:** The F-Measure values are quite close for both classes (0.842 for spam, 0.893 for emai), suggesting a relatively balanced performance in terms of precision and recall.
- **ROC and PRC Areas:** The **ROC Area of 0.886** for both classes indicates good discriminatory power, though it is slightly lower than the 0.944 observed with the Naive Bayes models. The PRC Area for spam (0.811) is also lower, suggesting potentially less robust performance in highly imbalanced scenarios specifically for the spam class compared to the Naive Bayes models.

---

### **Confusion Matrix**

The confusion matrix provides the exact counts of classifications:

|                  |                    |                     |
| ---------------- | ------------------ | ------------------- |
|                  | **Predicted Spam** | **Predicted Email** |
| **Actual Spam**  | 1567               | 246                 |
| **Actual Email** | 341                | 2447                |

- **True Positives (Spam):** 1567 spam emails were correctly identified as spam. This is the highest number of correctly identified spam emails across all the models evaluated so far.
- **False Negatives (Spam):** 246 actual spam emails were incorrectly classified as legitimate ("emai"). This is the lowest number of missed spam emails among the models.
- **False Positives (Spam):** 341 actual legitimate emails were incorrectly classified as spam. This is a significantly higher number of false alarms compared to the Naive Bayes models, which is a major drawback for a spam filter.
- **True Negatives (Spam):** 2447 actual legitimate emails were correctly identified as legitimate.

---

### **Summary**

The **IBk (1-Nearest Neighbor) algorithm with SMOTE** demonstrates a strong ability to **maximize the recall of spam** (catching a very high percentage of actual spam). This is evident from the high True Positive Rate for spam (0.864) and the lowest number of False Negatives (246) among the models.

However, this increased spam recall comes at the cost of a **significantly higher False Positive Rate for spam (0.122)**, meaning a larger number of legitimate emails are incorrectly flagged as spam (341 instances). While the overall accuracy is good and the Kappa statistic is strong, the higher false positive rate for spam is a critical consideration for practical application, as users typically find legitimate emails being marked as spam more annoying than occasionally receiving a spam email. The lower ROC and PRC Areas compared to Naive Bayes also suggest it might be less robust in discriminating between the classes.