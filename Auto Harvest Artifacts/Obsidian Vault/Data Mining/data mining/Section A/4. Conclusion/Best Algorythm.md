Comparing the performance of the Naive Bayes, IBk, Random Forest, and J48 algorithms—all enhanced with SMOTE to handle class imbalance—the **J48 (Decision Tree) classifier emerges as the optimal choice.**

---

### **Performance Comparison and Rationale**

|Metric|Naive Bayes (with SMOTE)|IBk (K-NN) (with SMOTE)|Random Forest (with SMOTE)|J48 (Decision Tree) (with SMOTE)|
|:--|:--|:--|:--|:--|
|**Correctly Classified Instances (%)**|87.04%|87.13%|88.20%|**90.28%**|
|**Kappa Statistic**|0.7303|0.7323|0.7549|**0.7963**|
|**Spam TP Rate (Recall)**|0.812|0.771|0.874|**0.873**|
|**Spam FP Rate**|**0.076**|0.134|0.113|**0.077**|
|**Spam Precision**|0.840|0.776|0.834|**0.880**|
|**Spam F-Measure**|0.826|0.773|0.854|**0.876**|
|**Spam FN Count**|340|416|228|**231**|
|**Spam FP Count**|**216**|377|315|**216**|

