from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from transformers import pipeline

class CodeExplanationView(APIView):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.explainer = pipeline("text2text-generation", model="facebook/bart-large-cnn")

    def post(self, request):
        code = request.data.get('code')
        language = request.data.get('language')

        if not code:
            return Response({"error": "No code provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            explanation = self.explain_code(code, language)
            return Response({"explanation": explanation})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def explain_code(self, code, language):
        prompt = f"Explain the following {language} code:\n\n{code}\n\nExplanation:"
        result = self.explainer(prompt, max_length=150, min_length=30, do_sample=False)
        return result[0]['generated_text']