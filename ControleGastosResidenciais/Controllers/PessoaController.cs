using Controle_de_Gastos_Residenciais.Models;
using Controle_de_Gastos_Residenciais.Models.DTOs;
using Controle_de_Gastos_Residenciais.Services;
using Microsoft.AspNetCore.Mvc;

namespace Controle_de_Gastos_Residenciais.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly PessoaService _service;
        //Utilizando o Service para não utilizar regras de negocio no controller
        public PessoaController(PessoaService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Create([FromBody] PessoaCriacaoDto dto)
        {
            var Pessoa = _service.Criar(dto);
            return CreatedAtAction(nameof(GetById), new { id = Pessoa.Id }, Pessoa);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.Listar());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var residente = _service.BuscarPorId(id);
            if (residente == null)
                return NotFound();

            return Ok(residente);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var removido = _service.Remover(id);
            if (!removido)
                return NotFound();

            return NoContent();
        }
    }
}
