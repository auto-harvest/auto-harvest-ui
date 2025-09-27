This report presents the evaluation of a **Naive Bayes classification algorithm** trained on an email dataset, aiming to differentiate between "spam" and "emai" (legitimate email). A key difference in this run is the use of the **SMOTE (Synthetic Minority Over-sampling Technique) filter** during the training phase, specifically `weka.filters.supervised.instance.SMOTE -C 0 -K 5 -P 54.0 -S 1`. This filter is typically applied to address class imbalance by generating synthetic samples for the minority class, which in this case seems to be "spam" given its original proportion in the dataset. The evaluation employed **10-fold cross-validation** on 4601 instances, utilizing the same 9 attributes as before.

---

### **Key Findings from the Evaluation**

- **Overall Accuracy:** The algorithm achieved an **88.09% correct classification rate**, correctly categorizing 4053 out of 4601 emails. This represents a notable improvement in overall accuracy compared to the previous run without SMOTE. The **incorrect classification rate was 11.91%** (548 instances).
- **Kappa Statistic:** A **Kappa statistic of 0.7402** indicates an even stronger agreement between the predicted and actual classifications than the previous run, suggesting improved reliability beyond random chance.
- **Error Measures:**
    - **Mean Absolute Error (MAE):** 0.1353
    - **Root Mean Squared Error (RMSE):** 0.3154 Both MAE and RMSE have decreased, indicating that the predictions are closer to the actual values, suggesting better model performance.

---

### **Detailed Performance by Class**

The application of SMOTE has had a noticeable impact on the class-specific performance:

|   |   |   |   |
|---|---|---|---|
|**Metric**|**Spam (Positive Class)**|**Email (Negative Class)**|**Weighted Average**|
|**True Positive Rate (Recall)**|0.734|0.976|0.881|
|**False Positive Rate**|0.024|0.266|0.170|
|**Precision**|0.953|0.850|0.890|
|**F-Measure**|0.829|0.909|0.877|
|**ROC Area**|0.944|0.944|0.944|
|**PRC Area**|0.929|0.946|0.939|

- **"Spam" Classification (Impact of SMOTE):**
    - The **recall (True Positive Rate) for spam has improved to 0.734** from 0.689 in the previous run. This means the algorithm is now catching a higher percentage of actual spam emails (73.4% versus 68.9%).
    - The **precision for spam remains very high at 0.953**, indicating that when the algorithm flags an email as spam, it's still highly accurate (95.3% of predicted spam emails are truly spam). There's a slight increase in the **False Positive Rate for spam to 0.024** (from 0.020), meaning a very slightly higher number of legitimate emails are now being misclassified as spam.
- **"Emai" (Legitimate Email) Classification:**
    - The **recall for "emai" remains excellent at 0.976**, showing that 97.6% of legitimate emails are still correctly identified.
    - The **precision for "emai" has improved to 0.850** (from 0.829), indicating that a greater proportion of emails predicted as "emai" are indeed legitimate.
    - The **False Positive Rate for "emai" has decreased to 0.266** (from 0.311), which means fewer actual spam emails are being missed and incorrectly classified as "emai."
- **Overall Balance:** The F-Measure, which balances precision and recall, has increased for both classes, particularly for spam (0.829 vs. 0.802 previously), suggesting a more balanced performance. The ROC Area and PRC Area remain consistently high, reaffirming the classifier's strong discriminative ability.

---

### **Confusion Matrix**

The confusion matrix provides a direct count of correct and incorrect classifications, clearly showing the effect of SMOTE:

|                  |                    |                     |
| ---------------- | ------------------ | ------------------- |
|                  | **Predicted Spam** | **Predicted Email** |
| **Actual Spam**  | 1331               | 482                 |
| **Actual Email** | 66                 | 2722                |

Comparing this to the previous run:

- **True Positives (Spam):** Increased from 1250 to 1331. The algorithm is now correctly identifying more spam emails.
- **False Negatives (Spam):** Decreased from 563 to 482. Fewer actual spam emails are being missed and classified as "emai."
- **False Positives (Spam):** Slightly increased from 56 to 66. A small increase in legitimate emails being incorrectly flagged as spam.
- **True Negatives (Spam):** Slightly decreased from 2732 to 2722. This is consistent with the small increase in false positives for spam.

In conclusion, the application of the **SMOTE filter** has demonstrably improved the Naive Bayes algorithm's ability to detect spam without significantly compromising its accuracy in identifying legitimate emails. The increased recall for spam means fewer unwanted emails are slipping through, making this configuration more effective for a spam filtering task where catching spam is a priority, even with a slight, acceptable increase in false positives.