using socialapp_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socialapp_backend.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Genger { get; set; }
        public int Age { get; set; }
        public string KnowAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotoForDetailedDto> Photos { get; set; }
    }
}
