
// Este script ajuda a gerar o package-lock.json sem reinstalar pacotes
// Execute com: node package.lock.js
const { execSync } = require('child_process');
const fs = require('fs');

console.log('Gerando package-lock.json...');

try {
  // Verificar se o arquivo package.json existe
  if (!fs.existsSync('./package.json')) {
    console.error('package.json não encontrado!');
    process.exit(1);
  }

  // Executar npm install apenas para gerar package-lock.json
  execSync('npm install --package-lock-only', { stdio: 'inherit' });
  
  console.log('✅ package-lock.json gerado com sucesso!');
} catch (error) {
  console.error('❌ Erro ao gerar package-lock.json:', error.message);
  process.exit(1);
}
