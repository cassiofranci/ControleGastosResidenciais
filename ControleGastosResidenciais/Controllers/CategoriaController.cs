using Controle_de_Gastos_Residenciais.Models.DTOs;
using Controle_de_Gastos_Residenciais.Services;
using Microsoft.AspNetCore.Mvc;

namespace Controle_de_Gastos_Residenciais.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : ControllerBase
    {
        private readonly CategoriaService _service;
        //Utilizando o Service para não utilizar regras de negocio no controller
        public CategoriaController(CategoriaService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Create([FromBody] CategoriaCriacaoDto dto)
        {
            try
            {
                var categoria = _service.Criar(dto);
                return CreatedAtAction(nameof(GetById), new { id = categoria.Id }, categoria);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.Listar());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var transacao = _service.BuscarPorId(id);
            if (transacao == null)
                return NotFound();

            return Ok(transacao);
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
