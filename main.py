import http.server
import socketserver
import webbrowser
import os

PORT = 8000

# Garante que o diretório atual seja o diretório deste arquivo
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler

print(f"==================================================")
print(f" Servidor da Calculadora de IMC iniciado!")
print(f" Acesse em seu navegador: http://localhost:{PORT}")
print(f" Pressione Ctrl + C para encerrar o servidor.")
print(f"==================================================")

try:
    webbrowser.open(f"http://localhost:{PORT}/index2.html")
except Exception:
    pass

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado.")

