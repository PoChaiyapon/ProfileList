using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace socialapp_backend.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(maximumLength:10,MinimumLength =5,ErrorMessage ="You must specify password between 5 and 10 charectors")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}
