import $ from 'jquery';
const baseURL = 'http://localhost:8080';


const buscarCategorias = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${baseURL}/categorias`,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        resolve(data); // Resolve a promessa com os dados da API
      },
      error: function (error) {
        console.error('Erro ao buscar categorias:', error);
        reject(error); // Rejeita a promessa com o erro
      },
    });
  });
};

const buscarProdutos = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${baseURL}/produtos`,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        const produtos = data.content;
        resolve(produtos); // Resolve a promessa com os dados da API
      },
      error: function (error) {
        console.error('Erro ao buscar produtos:', error);
        reject(error); // Rejeita a promessa com o erro
      },
    });
  });
};


const removerProduto = (id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${baseURL}/produtos/${id}`,
      type: 'DELETE',
      dataType: 'json',
      success: function (data) {
        const produtos = data.content;
        resolve(produtos); // Resolve a promessa com os dados da API
      },
      error: function (error) {
        console.error('Erro ao buscar produtos:', error);
        reject(error); // Rejeita a promessa com o erro
      },
    });
  });
};

const removerCategoria = (id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${baseURL}/categorias/${id}`,
      type: 'DELETE',
      dataType: 'json',
      success: function (data) {
        const categorias = data.content;
        resolve(categorias); // Resolve a promessa com os dados da API
      },
      error: function (error) {
        console.error('Erro ao buscar produtos:', error);
        reject(error); // Rejeita a promessa com o erro
      },
    });
  });
};

const buscarProduto = (id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${baseURL}/produtos/${id}`,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        const Produto = data;
        resolve(Produto); // Resolve a promessa com os dados da API
      },
      error: function (error) {
        console.error('Erro ao buscar produto:', error);
        reject(error); // Rejeita a promessa com o erro
      },
    });
  });
};

const cadastrarProduto = (data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${baseURL}/produtos`,
      data: JSON.stringify(data), // Converte os dados para JSON (ou use outro formato adequado)
      contentType: 'application/json', // Define o tipo de conteúdo para JSON
      success: function (data) {
        resolve();
        console.log('Requisição POST bem-sucedida. Resposta:', data);
      },
      error: function (error) {
        // Callback chamado em caso de erro na requisição
        console.error('Erro na requisição POST:', error);
        reject(error);
      }
    });
  });
}

const cadastrarCategoria= (data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: `${baseURL}/categorias`,
      data: JSON.stringify(data), // Converte os dados para JSON (ou use outro formato adequado)
      contentType: 'application/json', // Define o tipo de conteúdo para JSON
      success: function (data) {
        resolve();
        console.log('Requisição POST bem-sucedida. Resposta:', data);
      },
      error: function (error) {
        // Callback chamado em caso de erro na requisição
        console.error('Erro na requisição POST:', error);
        reject(error);
      }
    });
  });
}


const alterarProduto = (data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'PUT',
      url: `${baseURL}/produtos`,
      data: JSON.stringify(data), // Converte os dados para JSON (ou use outro formato adequado)
      contentType: 'application/json', // Define o tipo de conteúdo para JSON
      success: function (data) {
        resolve();
        console.log('Requisição PUT bem-sucedida. Resposta:', data);
      },
      error: function (error) {
        // Callback chamado em caso de erro na requisição
        console.error('Erro na requisição POST:', error);
        reject(error);
      }
    });
  });
}

export { buscarCategorias, buscarProdutos, buscarProduto, removerProduto, cadastrarProduto, alterarProduto, cadastrarCategoria, removerCategoria };