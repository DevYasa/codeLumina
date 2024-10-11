from djongo import models

class CodeExplanation(models.Model):
    code = models.TextField()
    language = models.CharField(max_length=50)
    explanation = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Explanation for {self.language} code"