let participantes = [
  {
    nome: "Henrique Vilar",
    email: "henrique@gamail.com",
    dataInscriçao: new Date(2024, 2, 22, 20, 30),
    dataCheckIn: null
  },
  {
    nome: "Gustavo Nascimento",
    email: "qustavo@gamail.com",
    dataInscriçao: new Date(2024, 2, 26, 14, 12),
    dataCheckIn: null
  },
  {
    nome: "Maria Silva",
    email: "maria@gamail.com",
    dataInscriçao: new Date(2024, 2, 28, 10, 20),
    dataCheckIn: new Date(2024, 2, 29, 9, 45)
  },
  {
    nome: "João Oliveira",
    email: "joao@gamail.com",
    dataInscriçao: new Date(2024, 2, 30, 18, 50),
    dataCheckIn: new Date(2024, 3, 1, 16, 20)
  },
  {
    nome: "Ana Santos",
    email: "ana@gamail.com",
    dataInscriçao: new Date(2024, 3, 2, 12, 30),
    dataCheckIn: new Date(2024, 3, 3, 11, 15)
  },
  {
    nome: "Pedro Costa",
    email: "pedro@gamail.com",
    dataInscriçao: new Date(2024, 3, 4, 16, 40),
    dataCheckIn: new Date(2024, 3, 5, 15, 10)
  },
  {
    nome: "Carla Pereira",
    email: "carla@gamail.com",
    dataInscriçao: new Date(2024, 3, 6, 9, 0),
    dataCheckIn: null
  },
  {
    nome: "Ricardo Ferreira",
    email: "ricardo@gamail.com",
    dataInscriçao: new Date(2024, 3, 8, 20, 20),
    dataCheckIn: new Date(2024, 3, 9, 18, 45)
  },
  {
    nome: "Luisa Carvalho",
    email: "luisa@gamail.com",
    dataInscriçao: new Date(2024, 3, 10, 15, 10),
    dataCheckIn: new Date(2024, 3, 11, 14, 30)
  },
  {
    nome: "Mariana Rodrigues",
    email: "mariana@gamail.com",
    dataInscriçao: new Date(2024, 3, 12, 11, 45),
    dataCheckIn: null
  }
];

console.log(participantes);


const criarNovoParticipante = (participante) => {
  const dataInscriçao = dayjs(Date.now()).to(participante.dataInscriçao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button 
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)">
      Confimmar Check-In
    </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>${participante.nome}</strong>
        <br>
        <small>${participante.email}</small>
      </td>
      <td>${dataInscriçao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscriçao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email
  })

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {

  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return 
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email 
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}