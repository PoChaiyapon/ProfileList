using AutoMapper;
using socialapp_backend.Dtos;
using socialapp_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace socialapp_backend.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                    src.Photos.FirstOrDefault(p => p.isMain).Url))
                .ForMember(dest => dest.Age, opt =>
                    opt.MapFrom(age => age.DateOfBirth.CalculateAge()));
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                    src.Photos.FirstOrDefault(p => p.isMain).Url))
                .ForMember(dest => dest.Age, opt =>
                    opt.MapFrom(age => age.DateOfBirth.CalculateAge()));
            CreateMap<Photo, UserForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}
