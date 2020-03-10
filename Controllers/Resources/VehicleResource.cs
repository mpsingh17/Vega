using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace Vega.Controllers.Resources
{
    public class VehicleResource
    {
        public int Id { get; set; }

        public int ModelId { get; set; }

        public bool IsRegistered { get; set; }
        
        [Required]
        public ContactResource Contact { get; set; }

        public ICollection<int> VehicleFeatures { get; set; }

        public VehicleResource()
        {
            VehicleFeatures = new Collection<int>();
        }
    }
}